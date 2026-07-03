export const FLUTTER_CODE_EXPLAINER = `
### Getting Started with Corner Streams Business

This project is tailored for shop owners who need to track inventory and record sales transactions securely on Firebase Firestore.

#### Step 1: Firebase Project Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project named **Corner Streams Business**.
2. Enable **Firestore Database** in production or test mode.
3. Enable **Firebase Authentication** using the **Email/Password** provider (or phone provider for SMS/WhatsApp authorizations).

#### Step 2: Set Up Firestore Security Rules
Go to the **Rules** tab in your Firebase Console under Cloud Firestore and paste the provided rules from the **firestore.rules** tab in this viewer. These rules ensure that each logged-in user can strictly interact with document stream records where \`userId == request.auth.uid\`.

#### Step 3: Install Flutter Dependencies
Add the following core packages to your \`pubspec.yaml\` under dependencies:
\`\`\`yaml
dependencies:
  flutter:
    sdk: flutter
  firebase_core: ^2.24.0
  firebase_auth: ^4.15.0
  cloud_firestore: ^4.13.0
  google_fonts: ^6.1.0
\`\`\`

#### Step 4: Run the UI and Database Service
Replace \`lib/main.dart\` in your Flutter project with the code provided in the **main.dart** tab. 
Create a file named \`lib/database_service.dart\` and paste the code from the **database_service.dart** tab. Your app is now immediately ready to run and integrate!
`;

export const FIRESTORE_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper validation checks
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Products Rules: Only owners can read or write their own products
    match /products/{productId} {
      allow read, create, update, delete: if isOwner(
        resource != null ? resource.data.userId : request.resource.data.userId
      );
    }

    // Sales Rules: Only owners can read or record sales
    match /sales/{saleId} {
      allow read, create, update, delete: if isOwner(
        resource != null ? resource.data.userId : request.resource.data.userId
      );
    }
  }
}`;

export const DART_DATABASE_SERVICE = `import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

/// Professional Database and Transaction manager for "Corner Streams Business"
class DatabaseService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Retrieve current active authenticated Firebase userId
  String? get currentUserId => _auth.currentUser?.uid;

  // =========================================================================
  // FLOW 1: "ADD PRODUCT" FIRESTORE SUBMISSION (WITH VALIDATIONS & USERID MAP)
  // =========================================================================
  
  /// Takes inputs from the 'Add Product' form, validates them,
  /// maps them into a product JSON structure, and writes to Firestore.
  Future<void> submitProductToFirebase({
    required String name,
    required double costPrice,
    required double sellingPrice,
    required int initialStock,
  }) async {
    final uid = currentUserId;
    if (uid == null) {
      throw FirebaseAuthException(
        code: 'NOT_SIGNED_IN',
        message: 'You must be signed in to add items to your shop inventory.',
      );
    }

    // 1. Validate that input numbers are greater than zero
    if (name.trim().isEmpty) {
      throw Exception('Product Name cannot be empty.');
    }
    if (costPrice <= 0) {
      throw Exception('Cost Price must be greater than ₦0.00.');
    }
    if (sellingPrice <= 0) {
      throw Exception('Selling Price must be greater than ₦0.00.');
    }
    if (initialStock <= 0) {
      throw Exception('Initial Stock Quantity must be greater than 0.');
    }
    if (sellingPrice < costPrice) {
      throw Exception('Warning: Selling Price should ideally be higher than Cost Price to secure a profit margin!');
    }

    try {
      // 2. Map data into a secure JSON schema
      final Map<String, dynamic> productJson = {
        'userId': uid,                  // Auto-attach currently logged-in user UID
        'productName': name.trim(),
        'costPrice': costPrice,
        'sellingPrice': sellingPrice,
        'currentStock': initialStock,
        'createdAt': FieldValue.serverTimestamp(),
      };

      // 3. Save to Firestore under the 'products' collection
      await _db.collection('products').add(productJson);
    } catch (e) {
      print('Database error in submitProductToFirebase: $e');
      rethrow;
    }
  }

  // =========================================================================
  // FLOW 2: "COMPLETE SALE" SECURE CHECKOUT MULTI-DOC TRANSACTION 
  // =========================================================================

  /// Executes atomic stock deduction and checkout storage utilizing Firestore runTransaction().
  /// Deducts precise stock quantities for all items in the basket, preventing race conditions.
  Future<void> executeCheckoutTransaction({
    required List<Map<String, dynamic>> basketItems,
    required String paymentMethod,
  }) async {
    final uid = currentUserId;
    if (uid == null) {
      throw FirebaseAuthException(
        code: 'NOT_SIGNED_IN',
        message: 'You must be signed in to perform checkouts.',
      );
    }

    if (basketItems.isEmpty) {
      throw Exception('Cannot checkout an empty shopping basket.');
    }

    try {
      // Execute the multi-document Firestore Transaction
      await _db.runTransaction((transaction) async {
        
        // Step A: Prepare reference snapshots first. 
        // Note: In Cloud Firestore, ALL reads must occur before ALL writes inside transactions.
        final List<DocumentReference> productRefs = [];
        final List<DocumentSnapshot> productSnapshots = [];

        for (var item in basketItems) {
          final String prodId = item['id'];
          final DocumentReference docRef = _db.collection('products').doc(prodId);
          productRefs.add(docRef);
          
          // Transactional Read
          final DocumentSnapshot snap = await transaction.get(docRef);
          if (!snap.exists) {
            throw Exception('Product "\${item[\'productName\']}" was not found in your inventory database.');
          }
          productSnapshots.add(snap);
        }

        // Step B: Loop through each basket item inside the transaction and evaluate current DB stock levels
        for (int i = 0; i < basketItems.length; i++) {
          final item = basketItems[i];
          final snapshot = productSnapshots[i];
          
          final Map<String, dynamic> productDbData = snapshot.data() as Map<String, dynamic>;
          final int currentDbStock = productDbData['currentStock'] as int? ?? 0;
          final int basketQty = item['qty'] as int? ?? 0;
          final String productName = productDbData['productName'] ?? item['productName'];
          final double sellingPrice = (productDbData['sellingPrice'] as num?)?.toDouble() ?? 0.0;

          if (basketQty <= 0) continue; // Skip items that are not selected (quantity: 0)

          // 1. Enforce strict stock availability protection
          if (currentDbStock < basketQty) {
            throw Exception(
              'Oversold Item: "$productName" has only $currentDbStock units remaining in stock, '
              'but $basketQty units were added to the basket. Please adjust your register quantities!'
            );
          }

          // 2. Subtract basket quantity and prepare updated inventory map
          final int updatedStock = currentDbStock - basketQty;
          
          // Transactional Write: update product stock values
          transaction.update(productRefs[i], {
            'currentStock': updatedStock,
          });

          // 3. Document the completed sale transaction under the 'sales' collection
          final DocumentReference newSaleRef = _db.collection('sales').doc();
          transaction.set(newSaleRef, {
            'userId': uid,
            'productId': snapshot.id,
            'productName': productName,
            'quantitySold': basketQty,
            'sellingPrice': sellingPrice,
            'totalAmount': basketQty * sellingPrice,
            'paymentMethod': paymentMethod, // 'Cash' | 'Bank Transfer' | 'POS Card'
            'createdAt': FieldValue.serverTimestamp(),
          });
        }
      });
    } catch (e) {
      print('Database error in executeCheckoutTransaction: $e');
      rethrow;
    }
  }

  // =========================================================================
  // STREAM METRICS: REAL-TIME LOW STOCK TRACKER (THRESHOLD: <= 5 UNITS)
  // =========================================================================
  Stream<List<Map<String, dynamic>>> streamLowStockAlerts() {
    final uid = currentUserId;
    if (uid == null) {
      return Stream.value([]);
    }

    return _db
        .collection('products')
        .where('userId', isEqualTo: uid)
        .where('currentStock', isLessThanOrEqualTo: 5)
        .snapshots()
        .map((snapshot) {
          return snapshot.docs.map((doc) {
            final data = doc.data();
            data['id'] = doc.id;
            return data;
          }).toList();
        });
  }
}

// =========================================================================
// INTEGRATION GUIDE: FLUTTER UI BUTTON ONPRESSED WIRE-UP EXTRA CODES
// =========================================================================
/*
  /// HOW TO BIND GOOGLE FIREBASE STORAGE FLOWS TO YOUR FLUTTER BUTTON PRESETS:

  -------------------------------------------------------------------------
  1. WIRE-UP CODE: ADD PRODUCT SCREEN SUBMIT (AddProductScreen)
  -------------------------------------------------------------------------
  
  // Create an instance of our DatabaseService
  final DatabaseService _dbService = DatabaseService();
  bool _isSubmitting = false;

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isSubmitting = true);
      
      final String name = _nameController.text.trim();
      final double cost = double.tryParse(_costController.text) ?? 0.0;
      final double selling = double.tryParse(_sellingController.text) ?? 0.0;
      final int stock = int.tryParse(_stockController.text) ?? 0;

      try {
        // Trigger Firestore submit Product controller code
        await _dbService.submitProductToFirebase(
          name: name,
          costPrice: cost,
          sellingPrice: selling,
          initialStock: stock,
        );

        // Success Alert representation via Flutter SnackBar
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Row(
              children: [
                const Icon(Icons.check_circle, color: Colors.white),
                const SizedBox(width: 8),
                Expanded(child: Text('✓ "$name" saved to Firestore inventory!')),
              ],
            ),
            backgroundColor: const Color(0xFF00875A), // Green brand color
            behavior: SnackBarBehavior.floating,
            duration: const Duration(seconds: 3),
          ),
        );

        // Reset text boxes
        _nameController.clear();
        _costController.clear();
        _sellingController.clear();
        _stockController.clear();
      } catch (error) {
        // Handle database failure and notify user instantly
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Row(
              children: [
                const Icon(Icons.error_outline, color: Colors.white),
                const SizedBox(width: 8),
                Expanded(child: Text('Error: \${error.toString()}')),
              ],
            ),
            backgroundColor: Colors.red[800],
            behavior: SnackBarBehavior.floating,
            duration: const Duration(seconds: 4),
          ),
        );
      } finally {
        setState(() => _isSubmitting = false);
      }
    }
  }

  -------------------------------------------------------------------------
  2. WIRE-UP CODE: COMPLETE Basket SALE (CurrentBasketScreen)
  -------------------------------------------------------------------------

  // Create database service instance
  final DatabaseService _dbService = DatabaseService();
  bool _isCheckingOut = false;

  void _completeCheckoutSale() async {
    // Isolate chosen checkout products that possess positive quantity
    final List<Map<String, dynamic>> activeItems = widget.basketItems
        .where((item) => (item['qty'] as int? ?? 0) > 0)
        .toList();

    if (activeItems.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('⚠️ Cannot checkout empty basket. Add items first!'),
          backgroundColor: Colors.orange,
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    setState(() => _isCheckingOut = true);

    try {
      // Trigger execution of the safe multi-document transaction decrementer
      await _dbService.executeCheckoutTransaction(
        basketItems: activeItems,
        paymentMethod: _selectedPaymentMethod, // e.g. 'Cash', 'Bank Transfer', 'POS Card'
      );

      // Trigger standard Success Alert SnackBar indicating sale is locked in
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Row(
            children: [
              Icon(Icons.stars_rounded, color: Colors.white),
              SizedBox(width: 8),
              Expanded(child: Text('🎉 Checkout Complete! Stock levels modified successfully.')),
            ],
          ),
          backgroundColor: Color(0xFF0052CC), // Royal Blue brand theme
          behavior: SnackBarBehavior.floating,
          duration: Duration(seconds: 3),
        ),
      );

      // Empty current basket UI quantities values
      setState(() {
        for (var item in widget.basketItems) {
          item['qty'] = 0;
        }
      });
      
      // Return to main store dashboard
      Navigator.pop(context);
    } catch (error) {
      // Trigger Failure Alert SnackBar if stock levels change or internet times out
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Row(
            children: [
              const Icon(Icons.warning, color: Colors.white),
              const SizedBox(width: 8),
              Expanded(child: Text('Checkout Blocked: \${error.toString()}')),
            ],
          ),
          backgroundColor: Colors.red[800],
          behavior: SnackBarBehavior.floating,
          duration: const Duration(seconds: 5),
        ),
      );
    } finally {
      setState(() => _isCheckingOut = false);
    }
  }
*/

// =========================================================================
// PART 2: FLUTTER DASHBOARD DAILY REPORT PDF DOWNLOAD LINK WIDGET
// =========================================================================
import 'package:url_launcher/url_launcher.dart';

class DailyReportDownloadCard extends StatelessWidget {
  final String currentUserId;
  const DailyReportDownloadCard({super.key, required this.currentUserId});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: FirebaseFirestore.instance
          .collection('daily_reports')
          .where('userId', isEqualTo: currentUserId)
          .orderBy('reportDate', descending: true)
          .limit(1)
          .snapshots(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Card(
            elevation: 1,
            color: Colors.white,
            child: Padding(
              padding: EdgeInsets.all(16.0),
              child: Center(
                child: SizedBox(
                  width: 24,
                  height: 24,
                  child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF0052CC)),
                ),
              ),
            ),
          );
        }

        if (snapshot.hasError) {
          return Card(
            elevation: 1,
            color: Colors.white,
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Text(
                'Failed to load report download link: \${snapshot.error.toString()}',
                style: TextStyle(color: Colors.red[800], fontSize: 11),
              ),
            ),
          );
        }

        if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
          return Card(
            elevation: 1,
            color: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
              side: const BorderSide(color: Color(0xFFE2E8F0)),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(Icons.info_outline, color: Color(0xFF64748B), size: 20),
                  ),
                  const SizedBox(width: 12),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'No Reports Ready Yet',
                          style: TextStyle(
                            color: Color(0xFF0A2540),
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                          ),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'The scheduled daily task generates your PDF tonight at 11:59 PM.',
                          style: TextStyle(color: Color(0xFF64748B), fontSize: 10),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        }

        // Parse document snapshot data
        final reportDoc = snapshot.data!.docs.first;
        final reportData = reportDoc.data() as Map<String, dynamic>;
        final String reportDate = reportData['reportDate'] ?? 'Unknown Date';
        final String pdfUrl = reportData['pdfUrl'] ?? '';
        final Map<String, dynamic> metrics = reportData['metrics'] ?? {};
        
        final double totalRevenue = (metrics['totalRevenue'] as num?)?.toDouble() ?? 0.0;
        final double totalProfit = (metrics['totalProfit'] as num?)?.toDouble() ?? 0.0;
        final int itemsSold = metrics['itemsSold'] as int? ?? 0;

        return Card(
          elevation: 2,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Card header section
                Row(
                  mainAxisAlignment: MainAxisAlignment.between,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: const Color(0xFF0052CC).withOpacity(0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Icon(Icons.picture_as_pdf, color: Color(0xFF0052CC), size: 18),
                        ),
                        const SizedBox(width: 10),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Daily PDF Performance Report',
                              style: TextStyle(
                                color: Color(0xFF0A2540),
                                fontWeight: FontWeight.bold,
                                fontSize: 13,
                              ),
                            ),
                            Text(
                              'Generated: \${reportDate}',
                              style: const TextStyle(color: Color(0xFF64748B), fontSize: 10),
                            ),
                          ],
                        ),
                      ],
                    ),
                    
                    // Royal Blue Download Icon Button calling URL LAUNCHER
                    IconButton(
                      icon: const Icon(Icons.file_download_outlined, color: Color(0xFF0052CC), size: 22),
                      onPressed: () async {
                        if (pdfUrl.isEmpty) return;
                        final Uri uri = Uri.parse(pdfUrl);
                        try {
                          if (await canLaunchUrl(uri)) {
                            await launchUrl(uri, mode: LaunchMode.externalApplication);
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('✓ Launching PDF download link in your browser!'),
                                backgroundColor: Color(0xFF00875A),
                                behavior: SnackBarBehavior.floating,
                              ),
                            );
                          } else {
                            throw 'Launch request rejected';
                          }
                        } catch (err) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('⚠️ Could not launch PDF URL: \${err.toString()}'),
                              backgroundColor: Colors.red[800],
                              behavior: SnackBarBehavior.floating,
                            ),
                          );
                        }
                      },
                    ),
                  ],
                ),
                const Divider(height: 24, color: Color(0xFFF1F5F9)),
                
                // Secondary grid overview of stats
                Row(
                  mainAxisAlignment: MainAxisAlignment.between,
                  children: [
                    _buildStatCol('REVENUE', '₦\${totalRevenue.toStringAsFixed(0)}', const Color(0xFF0A2540)),
                    _buildStatCol('NET PROFIT', '₦\${totalProfit.toStringAsFixed(0)}', const Color(0xFF00875A)),
                    _buildStatCol('ITEMS SOLD', '\${itemsSold} units', const Color(0xFF0052CC)),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildStatCol(String label, String value, Color valueColor) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(color: Color(0xFF64748B), fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 0.5),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(color: valueColor, fontSize: 13, fontWeight: FontWeight.black, fontFamily: 'JetBrains Mono'),
        ),
      ],
    );
  }
}
*/
`;

export const FLUTTER_DART_CODE = `import 'package:flutter/material.dart';

void main() {
  runApp(const CornerStreamsApp());
}

/// Main Application Entry Point
class CornerStreamsApp extends StatelessWidget {
  const CornerStreamsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Corner Streams Business',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Inter',
        scaffoldBackgroundColor: const Color(0xFFFFFFFF),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0052CC), // Royal Blue
          primary: const Color(0xFF0052CC),
          secondary: const Color(0xFF0A2540), // Deep Navy
          error: const Color(0xFFD32F2F),
        ),
        useMaterial3: true,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const WelcomeScreen(),
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/terms': (context) => const TermsScreen(),
        '/dashboard': (context) => const DashboardScreen(),
      },
    );
  }
}

// ==========================================
// PALETTE CONSTANTS (User Core Color Tokens)
// ==========================================
const Color kColorNavy = Color(0xFF0A2540);     // Deep Navy Blue Text/Headers
const Color kColorRoyal = Color(0xFF0052CC);    // Vibrant Royal Blue Accent/Primary Action
const Color kColorGreen = Color(0xFF00875A);    // Kelly Green Success/Inventory Save
const Color kColorWhite = Color(0xFFFFFFFF);    // Primary Backgrounds
const Color kColorLightGray = Color(0xFFE2E8F0); // Dividers and Fields Borders
const Color kColorGrayText = Color(0xFF64748B); // Secondary body text

// ==========================================
// CUSTOM VECTOR ARTWORK PAINTERS
// ==========================================

/// Custom Painter to render Corner Streams Business Logo crisp vectorially in Flutter
class LogoPainter extends CustomPainter {
  const LogoPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final paintNavy = Paint()
      ..color = kColorNavy
      ..style = PaintingStyle.stroke
      ..strokeWidth = 6.0
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    final paintNavyThin = Paint()
      ..color = kColorNavy
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4.0
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    final paintRoyal = Paint()
      ..color = kColorRoyal
      ..style = PaintingStyle.fill;

    final paintRoyalStroke = Paint()
      ..color = kColorRoyal
      ..style = PaintingStyle.stroke
      ..strokeWidth = 6.0
      ..strokeCap = StrokeCap.round;

    final paintGreenStroke = Paint()
      ..color = kColorGreen
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4.0
      ..strokeCap = StrokeCap.round;

    final paintLightBlueStroke = Paint()
      ..color = const Color(0xFF60A5FA)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.0
      ..strokeCap = StrokeCap.round;

    final double w = size.width;
    final double h = size.height;

    // Draw Corner / L-Shape Frame
    final Path lPath = Path()
      ..moveTo(w * 0.3, h * 0.2)
      ..lineTo(w * 0.3, h * 0.675)
      ..quadraticBezierTo(w * 0.3, h * 0.75, w * 0.375, h * 0.75)
      ..lineTo(w * 0.8, h * 0.75);
    canvas.drawPath(lPath, paintNavy);

    final Path lPathOuter = Path()
      ..moveTo(w * 0.25, h * 0.2)
      ..lineTo(w * 0.25, h * 0.725)
      ..quadraticBezierTo(w * 0.25, h * 0.8, w * 0.325, h * 0.8)
      ..lineTo(w * 0.8, h * 0.8);
    canvas.drawPath(lPathOuter, paintNavyThin);

    // Draw Rising Bar Charts
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(w * 0.525, h * 0.575, w * 0.05, h * 0.125),
        const Radius.circular(2),
      ),
      paintRoyal,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(w * 0.615, h * 0.5, w * 0.05, h * 0.2),
        const Radius.circular(2),
      ),
      paintRoyal,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(w * 0.705, h * 0.45, w * 0.05, h * 0.25),
        const Radius.circular(2),
      ),
      paintRoyal,
    );

    // Draw Canopy/Awning outline
    final Path canopyBack = Path()
      ..moveTo(w * 0.68, h * 0.3)
      ..quadraticBezierTo(w * 0.71, h * 0.225, w * 0.75, h * 0.225)
      ..quadraticBezierTo(w * 0.785, h * 0.225, w * 0.82, h * 0.3)
      ..quadraticBezierTo(w * 0.855, h * 0.24, w * 0.89, h * 0.24)
      ..quadraticBezierTo(w * 0.925, h * 0.24, w * 0.955, h * 0.325)
      ..quadraticBezierTo(w * 0.9, h * 0.425, w * 0.85, h * 0.45);
    canvas.drawPath(canopyBack, paintNavyThin);

    final Path canopyCurve = Path()
      ..moveTo(w * 0.7, h * 0.375)
      ..quadraticBezierTo(w * 0.7, h * 0.45, w * 0.775, h * 0.45)
      ..quadraticBezierTo(w * 0.85, h * 0.45, w * 0.85, h * 0.375)
      ..quadraticBezierTo(w * 0.85, h * 0.45, w * 0.925, h * 0.45)
      ..quadraticBezierTo(w * 1.0, h * 0.45, w * 1.0, h * 0.375);
    canvas.drawPath(canopyCurve, paintNavy);

    // Draw Flowering Streams Curves
    final Path stream1 = Path()
      ..moveTo(w * 0.34, h * 0.675)
      ..cubicTo(w * 0.375, h * 0.55, w * 0.475, h * 0.4, w * 0.6, h * 0.35)
      ..cubicTo(w * 0.7, h * 0.31, w * 0.85, h * 0.25, w * 0.875, h * 0.125);
    canvas.drawPath(stream1, paintRoyalStroke);

    final Path stream2 = Path()
      ..moveTo(w * 0.39, h * 0.675)
      ..cubicTo(w * 0.425, h * 0.59, w * 0.5, h * 0.475, w * 0.59, h * 0.44)
      ..cubicTo(w * 0.675, h * 0.405, w * 0.775, h * 0.375, w * 0.8, h * 0.275);
    canvas.drawPath(stream2, paintGreenStroke);

    final Path stream3 = Path()
      ..moveTo(w * 0.44, h * 0.675)
      ..cubicTo(w * 0.465, h * 0.625, w * 0.525, h * 0.55, w * 0.6, h * 0.525)
      ..cubicTo(w * 0.66, h * 0.5, w * 0.725, h * 0.475, w * 0.75, h * 0.39);
    canvas.drawPath(stream3, paintLightBlueStroke);

    // Scattered Data Blocks
    canvas.drawRect(Rect.fromLTWH(w * 0.4, h * 0.35, 4, 4), paintRoyal);
    canvas.drawRect(Rect.fromLTWH(w * 0.46, h * 0.425, 3, 3), paintLightBlueStroke);
    canvas.drawRect(Rect.fromLTWH(w * 0.55, h * 0.275, 4, 4), paintRoyal);
    canvas.drawRect(Rect.fromLTWH(w * 0.625, h * 0.225, 2.5, 2.5), paintGreenStroke);
    canvas.drawRect(Rect.fromLTWH(w * 0.725, h * 0.16, 3.5, 3.5), paintRoyal);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// Background Watermark Painter for Nigerian ShopFront Theme (Welcome Page)
class ShopWatermarkPainter extends CustomPainter {
  const ShopWatermarkPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final paintLine = Paint()
      ..color = kColorNavy.withOpacity(0.04)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.5;

    final double w = size.width;
    final double h = size.height;

    // Street line
    canvas.drawLine(Offset(0, h * 0.7), Offset(w, h * 0.7), paintLine);
    
    // Store front rectangle
    canvas.drawRect(Rect.fromLTRB(w * 0.1, h * 0.35, w * 0.9, h * 0.7), paintLine);
    
    // Roofing structure
    final Path roof = Path()
      ..moveTo(w * 0.05, h * 0.35)
      ..lineTo(w * 0.15, h * 0.28)
      ..lineTo(w * 0.85, h * 0.28)
      ..lineTo(w * 0.95, h * 0.35)
      ..close();
    canvas.drawPath(roof, paintLine);

    // Store window/stall compartments
    canvas.drawRect(Rect.fromLTRB(w * 0.175, h * 0.43, w * 0.475, h * 0.62), paintLine);
    canvas.drawRect(Rect.fromLTRB(w * 0.525, h * 0.43, w * 0.825, h * 0.62), paintLine);
    
    // Door outline
    canvas.drawLine(Offset(w * 0.5, h * 0.43), Offset(w * 0.5, h * 0.7), paintLine);

    // Nigeria-inspired market umbrella or side kiosk
    canvas.drawCircle(Offset(w * 0.85, h * 0.58), 30, paintLine);
    canvas.drawLine(Offset(w * 0.85, h * 0.58), Offset(w * 0.85, h * 0.7), paintLine);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// Background Watermark Painter for Shop Owner pressing phone & smiling (Registration Page)
class OwnerWatermarkPainter extends CustomPainter {
  const OwnerWatermarkPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final paintLine = Paint()
      ..color = kColorNavy.withOpacity(0.04)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.5;

    final double w = size.width;
    final double h = size.height;

    // Draw stylized head, torso and hands of owner pressing phone
    canvas.drawCircle(Offset(w * 0.5, h * 0.28), 35, paintLine);
    
    // Smiling mouth sweep
    final Path smile = Path()
      ..moveTo(w * 0.46, h * 0.29)
      ..quadraticBezierTo(w * 0.5, h * 0.32, w * 0.54, h * 0.29);
    canvas.drawPath(smile, paintLine);
    
    // Eyes
    canvas.drawCircle(Offset(w * 0.45, h * 0.27), 2.5, paintLine);
    canvas.drawCircle(Offset(w * 0.55, h * 0.27), 2.5, paintLine);
    
    // Torso / Shoulders
    final Path torso = Path()
      ..moveTo(w * 0.25, h * 0.44)
      ..quadraticBezierTo(w * 0.3, h * 0.35, w * 0.4, h * 0.34)
      ..lineTo(w * 0.6, h * 0.34)
      ..quadraticBezierTo(w * 0.7, h * 0.35, w * 0.75, h * 0.44);
    canvas.drawPath(torso, paintLine);

    // Hands holding phone in center
    canvas.drawCircle(Offset(w * 0.45, h * 0.42), 12, paintLine);
    canvas.drawCircle(Offset(w * 0.55, h * 0.42), 12, paintLine);
    
    // Smartphone in hand
    final Path phone = Path()
      ..moveTo(w * 0.44, h * 0.37)
      ..lineTo(w * 0.56, h * 0.37)
      ..lineTo(w * 0.56, h * 0.45)
      ..lineTo(w * 0.44, h * 0.45)
      ..close();
    canvas.drawPath(phone, paintLine);

    // Desk outline / Counter below
    canvas.drawLine(Offset(0, h * 0.45), Offset(w, h * 0.45), paintLine);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// ==========================================
// SCREEN 1: WELCOME / ONBOARDING SCREEN
// ==========================================
class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kColorWhite,
      body: Stack(
        children: [
          const Positioned.fill(
            child: CustomPaint(
              painter: ShopWatermarkPainter(),
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
              child: Column(
                children: [
                  const Spacer(flex: 2),
                  const SizedBox(
                    width: 140,
                    height: 140,
                    child: CustomPaint(
                      painter: LogoPainter(),
                    ),
                  ),
                  const SizedBox(height: 20),
                  RichText(
                    textAlign: TextAlign.center,
                    text: const TextSpan(
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 26,
                        fontWeight: FontWeight.bold,
                        letterSpacing: -0.5,
                      ),
                      children: [
                        TextSpan(
                          text: 'Corner ',
                          style: TextStyle(color: kColorNavy),
                        ),
                        TextSpan(
                          text: 'Streams',
                          style: TextStyle(color: kColorRoyal),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'BUSINESS',
                    style: TextStyle(
                      color: kColorGreen,
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2.5,
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Monitor your shop from everywhere',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: kColorNavy,
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.symmetric(vertical: 20),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: kColorWhite,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: kColorLightGray, width: 1.5),
                    ),
                    child: Column(
                      children: [
                        Container(
                          height: 80,
                          width: double.infinity,
                          decoration: BoxDecoration(
                            color: kColorNavy.withOpacity(0.01),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const CustomPaint(
                            painter: OwnerWatermarkPainter(),
                          ),
                        ),
                        const SizedBox(height: 6),
                        const Text(
                          'Remote Sales Cockpit',
                          style: TextStyle(
                            color: kColorRoyal,
                            fontWeight: FontWeight.bold,
                            fontSize: 10,
                          ),
                        ),
                        const SizedBox(height: 2),
                        const Text(
                          'Owner monitors sales metrics while traveling',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: kColorNavy,
                            fontWeight: FontWeight.bold,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Spacer(),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          Navigator.pushNamed(context, '/register');
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: kColorRoyal,
                          foregroundColor: kColorWhite,
                          elevation: 0,
                          padding: const EdgeInsets.all(16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: const Text(
                          'Create Free Account',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      OutlinedButton(
                        onPressed: () {
                          Navigator.pushNamed(context, '/login');
                        },
                        style: OutlinedButton.styleFrom(
                          foregroundColor: kColorNavy,
                          side: const BorderSide(color: kColorNavy, width: 1.5),
                          padding: const EdgeInsets.all(16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: const Text(
                          'Log In',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ==========================================
// SCREEN 2: REGISTRATION SCREEN WITH SMS/WA OTP
// ==========================================
class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _businessNameController = TextEditingController();
  final _ownerNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  bool _obscurePassword = true;

  @override
  void dispose() {
    _businessNameController.dispose();
    _ownerNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _handleRegister() {
    if (_formKey.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Details verified! Verification WhatsApp sent.'),
          backgroundColor: kColorRoyal,
        ),
      );
      Future.delayed(const Duration(milliseconds: 800), () {
        if (mounted) {
          Navigator.pushNamed(context, '/terms');
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kColorWhite,
      appBar: AppBar(
        backgroundColor: kColorWhite,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: kColorNavy, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Create Free Account',
          style: TextStyle(color: kColorNavy, fontSize: 18, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  'Join Corner Streams',
                  style: TextStyle(color: kColorNavy, fontSize: 22, fontWeight: FontWeight.bold, letterSpacing: -0.5),
                ),
                const SizedBox(height: 6),
                const Text(
                  'Set up your shop metadata to begin tracking sales streams in real time.',
                  style: TextStyle(color: kColorGrayText, fontSize: 14),
                ),
                const SizedBox(height: 24),
                TextFormField(
                  controller: _businessNameController,
                  style: const TextStyle(color: kColorNavy, fontSize: 15),
                  decoration: _buildInput('Business Name', Icons.storefront, 'e.g. Alaba Electronics Store'),
                  validator: (v) => v == null || v.isEmpty ? 'Please enter business name' : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _phoneController,
                  style: const TextStyle(color: kColorNavy, fontSize: 15),
                  keyboardType: TextInputType.phone,
                  decoration: _buildInput('WhatsApp Number', Icons.phone, 'e.g. +234 803 123 4567'),
                  validator: (v) => v == null || v.length < 8 ? 'Please enter a valid WhatsApp number' : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _emailController,
                  style: const TextStyle(color: kColorNavy, fontSize: 15),
                  keyboardType: TextInputType.emailAddress,
                  decoration: _buildInput('Email Address', Icons.email_outlined, 'e.g. info@shop.com'),
                  validator: (v) => v == null || !v.contains('@') ? 'Enter a valid email address' : null,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  style: const TextStyle(color: kColorNavy, fontSize: 15),
                  decoration: _buildInput('Password', Icons.lock_outline, '••••••••'),
                  validator: (v) => v == null || v.length < 6 ? 'Password must be at least 6 characters' : null,
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: _handleRegister,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: kColorRoyal,
                    foregroundColor: kColorWhite,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  child: const Text('Create Free Account', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  InputDecoration _buildInput(String label, IconData icon, String hint) {
    return InputDecoration(
      labelText: label,
      floatingLabelBehavior: FloatingLabelBehavior.always,
      labelStyle: const TextStyle(color: kColorNavy, fontSize: 13, fontWeight: FontWeight.bold),
      hintText: hint,
      prefixIcon: Icon(icon, color: kColorNavy, size: 20),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: const BorderSide(color: kColorLightGray),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: const BorderSide(color: kColorNavy, width: 2),
      ),
    );
  }
}

// ==========================================
// SCREEN 3: LOGIN SCREEN
// ==========================================
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  void _handleLogin() {
    if (_formKey.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Logging in... Welcome back!'), backgroundColor: kColorGreen),
      );
      Future.delayed(const Duration(milliseconds: 1000), () {
        if (mounted) {
          Navigator.pushNamedAndRemoveUntil(context, '/dashboard', (route) => false);
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kColorWhite,
      appBar: AppBar(backgroundColor: kColorWhite, elevation: 0),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 8.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(
                  width: 100,
                  height: 100,
                  child: CustomPaint(painter: LogoPainter()),
                ),
                const SizedBox(height: 16),
                const Text(
                  'Log In to Shop',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: kColorNavy, fontSize: 22, fontWeight: FontWeight.bold, letterSpacing: -0.5),
                ),
                const SizedBox(height: 6),
                const Text(
                  'Access your sales, streams, inventory logs, and shop metrics from anywhere.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: kColorGrayText, fontSize: 13),
                ),
                const SizedBox(height: 32),
                TextFormField(
                  controller: _emailController,
                  style: const TextStyle(color: kColorNavy),
                  decoration: const InputDecoration(
                    labelText: 'Email Address',
                    floatingLabelBehavior: FloatingLabelBehavior.always,
                    labelStyle: TextStyle(color: kColorNavy, fontWeight: FontWeight.bold),
                    enabledBorder: UnderlineInputBorder(borderSide: BorderSide(color: kColorLightGray)),
                    focusedBorder: UnderlineInputBorder(borderSide: BorderSide(color: kColorNavy)),
                  ),
                  validator: (v) => v == null || !v.contains('@') ? 'Invalid email' : null,
                ),
                const SizedBox(height: 20),
                TextFormField(
                  controller: _passwordController,
                  obscureText: true,
                  style: const TextStyle(color: kColorNavy),
                  decoration: const InputDecoration(
                    labelText: 'Password',
                    floatingLabelBehavior: FloatingLabelBehavior.always,
                    labelStyle: TextStyle(color: kColorNavy, fontWeight: FontWeight.bold),
                    enabledBorder: UnderlineInputBorder(borderSide: BorderSide(color: kColorLightGray)),
                    focusedBorder: UnderlineInputBorder(borderSide: BorderSide(color: kColorNavy)),
                  ),
                  validator: (v) => v == null || v.isEmpty ? 'Please enter password' : null,
                ),
                const SizedBox(height: 32),
                ElevatedButton(
                  onPressed: _handleLogin,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: kColorRoyal,
                    foregroundColor: kColorWhite,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  child: const Text('Log In', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ==========================================
// SCREEN 4: TERMS & CONDITIONS SCREEN
// ==========================================
class TermsScreen extends StatefulWidget {
  const TermsScreen({super.key});

  @override
  State<TermsScreen> createState() => _TermsScreenState();
}

class _TermsScreenState extends State<TermsScreen> {
  bool _acceptedTerms = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kColorWhite,
      appBar: AppBar(title: const Text('Terms of Service', style: TextStyle(color: kColorNavy))),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text('Terms & Conditions', style: TextStyle(color: kColorNavy, fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(12),
                color: const Color(0xFFF8FAFC),
                child: const SingleChildScrollView(
                  child: Text(
                    'Welcome to Corner Streams! By registering an account with Corner Streams, you agree to track your streams, inventory logs, and shop metrics under authenticated tokens securely...',
                    style: TextStyle(color: kColorNavy, fontSize: 13, height: 1.4),
                  ),
                ),
              ),
            ),
            Row(
              children: [
                Checkbox(
                  value: _acceptedTerms,
                  activeColor: kColorRoyal,
                  onChanged: (v) => setState(() => _acceptedTerms = v ?? false),
                ),
                const Expanded(
                  child: Text('I agree to the Terms of Service & Privacy Policy.', style: TextStyle(fontSize: 12)),
                )
              ],
            ),
            ElevatedButton(
              onPressed: () {
                if (_acceptedTerms) {
                  Navigator.pushReplacementNamed(context, '/login');
                }
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: _acceptedTerms ? kColorRoyal : Colors.grey,
                foregroundColor: Colors.white,
              ),
              child: const Text('Accept & Proceed'),
            )
        // ==========================================
// UNIFIED DASHBOARD WITH INTEGRATED TABS
// ==========================================
class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _currentIndex = 0;
  String _userRole = 'owner'; // 'owner' vs 'staff'

  // Global mockup list representing inventory products with updated category assignments
  final List<Map<String, dynamic>> _mockProducts = [
    {'id': 'prod1', 'productName': 'Indomie Super Pack', 'costPrice': 5200.0, 'sellingPrice': 6000.0, 'currentStock': 18, 'category': 'Snacks', 'imageUrl': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=60'},
    {'id': 'prod2', 'productName': 'Golden Penny Pasta', 'costPrice': 4100.0, 'sellingPrice': 4800.0, 'currentStock': 4, 'category': 'Snacks', 'imageUrl': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=60'},
    {'id': 'prod3', 'productName': 'Peak Milk Refill 400g', 'costPrice': 2850.0, 'sellingPrice': 3200.0, 'currentStock': 3, 'category': 'Beverages', 'imageUrl': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=150&auto=format&fit=crop&q=60'},
    {'id': 'prod4', 'productName': 'Gala Super Sausage', 'costPrice': 150.0, 'sellingPrice': 200.0, 'currentStock': 45, 'category': 'Snacks', 'imageUrl': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=60'},
  ];

  // Active items currently in checkout basket
  final List<Map<String, dynamic>> _basketItems = [];

  void _addNewProductToMock(Map<String, dynamic> item) {
    setState(() {
      _mockProducts.add(item);
      _basketItems.add({
        'id': item['id'],
        'productName': item['productName'],
        'sellingPrice': item['sellingPrice'],
        'qty': 0,
      });
    });
  }

  void _completeBasketSale(List<Map<String, dynamic>> soldItems, String method) {
    setState(() {
      for (final soldItem in soldItems) {
        final prodId = soldItem['id'];
        final qty = soldItem['qty'] as int;
        final product = _mockProducts.firstWhere((p) => p['id'] == prodId);
        product['currentStock'] = (product['currentStock'] as int) - qty;
      }
      _basketItems.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    // Synchronize initial matching basket
    if (_basketItems.isEmpty) {
      for (var product in _mockProducts) {
        _basketItems.add({
          'id': product['id'],
          'productName': product['productName'],
          'sellingPrice': product['sellingPrice'],
          'qty': 0,
        });
      }
    }

    final List<Widget> screens = [
      CheckoutScreen(
        basketItems: _basketItems,
        mockProducts: _mockProducts,
        onCheckoutComplete: _completeBasketSale,
        userRole: _userRole,
        onRoleChanged: (role) => setState(() => _userRole = role),
      ),
      AddProductScreen(
        onSaveProduct: _addNewProductToMock,
        userRole: _userRole,
        onRoleChanged: (role) => setState(() => _userRole = role),
      ),
      LowStockAlertScreen(
        mockProducts: _mockProducts,
        userRole: _userRole,
        onRoleChanged: (role) => setState(() => _userRole = role),
      ),
      ReportsScreen(
        userRole: _userRole,
        onRoleChanged: (role) => setState(() => _userRole = role),
      ),
    ];

    return Scaffold(
      body: screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        selectedItemColor: kColorRoyal,
        unselectedItemColor: kColorGrayText,
        backgroundColor: Colors.white,
        selectedFontSize: 11,
        unselectedFontSize: 11,
        iconSize: 22,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_cart_outlined),
            activeIcon: Icon(Icons.shopping_cart),
            label: 'Counter Basket',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add_box_outlined),
            activeIcon: Icon(Icons.add_box),
            label: 'Add Product',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.warning_amber_outlined),
            activeIcon: Icon(Icons.warning_amber_rounded),
            label: 'Low Stock Alerts',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.picture_as_pdf_outlined),
            activeIcon: Icon(Icons.picture_as_pdf),
            label: 'PDF Reports',
          ),
        ],
      ),
    );
  }
}

// ==========================================
// SCREEN A: ADD PRODUCT LAYOUT WITH SCANNER & IMAGE PLACEHOLDER
// ==========================================
class AddProductScreen extends StatefulWidget {
  final Function(Map<String, dynamic>) onSaveProduct;
  final String userRole;
  final Function(String) onRoleChanged;

  const AddProductScreen({
    super.key,
    required this.onSaveProduct,
    required this.userRole,
    required this.onRoleChanged,
  });

  @override
  State<AddProductScreen> createState() => _AddProductScreenState();
}

class _AddProductScreenState extends State<AddProductScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _costController = TextEditingController();
  final _sellingController = TextEditingController();
  final _stockController = TextEditingController();
  
  String? _selectedImageUrl;
  String _selectedCategory = 'Snacks';

  void _scanBarcode() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('📷 Simulating Barcode Hardware Scan... Code: 6159230581'),
        backgroundColor: kColorRoyal,
        duration: Duration(seconds: 2),
      ),
    );
    setState(() {
      _nameController.text = 'Super Golden Premium Flour';
      _costController.text = '8200';
      _sellingController.text = '9600';
      _stockController.text = '15';
      _selectedCategory = 'Snacks';
    });
  }

  void _pickProductImage() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => SafeArea(
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                'pickProductImage()',
                style: TextStyle(color: kColorNavy, fontWeight: FontWeight.black, fontSize: 11, letterSpacing: 0.5),
              ),
              const SizedBox(height: 4),
              const Text(
                'Choose simulated photographic source',
                style: TextStyle(color: kColorGrayText, fontSize: 11),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {
                        Navigator.pop(ctx);
                        String url = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=60';
                        if (_selectedCategory == 'Fabrics') {
                          url = 'https://images.unsplash.com/photo-1524295988555-463e3d48408f?w=150&auto=format&fit=crop&q=60';
                        } else if (_selectedCategory == 'Electronics') {
                          url = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=150&auto=format&fit=crop&q=60';
                        }
                        setState(() {
                          _selectedImageUrl = url;
                        });
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('📸 Camera Snap: Simulating lens sensor trigger!'), backgroundColor: kColorGreen),
                        );
                      },
                      icon: const Icon(Icons.camera_alt_outlined, color: kColorRoyal),
                      label: const Text('Camera Snap', style: TextStyle(color: kColorRoyal, fontWeight: FontWeight.bold)),
                      style: OutlinedButton.styleFrom(
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {
                        Navigator.pop(ctx);
                        String url = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=60';
                        if (_selectedCategory == 'Fabrics') {
                          url = 'https://images.unsplash.com/photo-1524295988555-463e3d48408f?w=150&auto=format&fit=crop&q=60';
                        } else if (_selectedCategory == 'Electronics') {
                          url = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=150&auto=format&fit=crop&q=60';
                        }
                        setState(() {
                          _selectedImageUrl = url;
                        });
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('📂 Gallery Upload: Preset image chosen successfully!'), backgroundColor: kColorRoyal),
                        );
                      },
                      icon: const Icon(Icons.photo_library_outlined, color: kColorGreen),
                      label: const Text('Gallery', style: TextStyle(color: kColorGreen, fontWeight: FontWeight.bold)),
                      style: OutlinedButton.styleFrom(
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
            ],
          ),
        ),
      ),
    );
  }

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      final name = _nameController.text.trim();
      final costPrice = double.tryParse(_costController.text) ?? 0.0;
      final sellingPrice = double.tryParse(_sellingController.text) ?? 0.0;
      final stock = int.tryParse(_stockController.text) ?? 0;

      final keyId = 'prod\${DateTime.now().millisecondsSinceEpoch}';
      
      widget.onSaveProduct({
        'id': keyId,
        'productName': name,
        'costPrice': costPrice,
        'sellingPrice': sellingPrice,
        'currentStock': stock,
        'category': _selectedCategory,
        'imageUrl': _selectedImageUrl,
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('✓ "\$name" saved to inventory!'),
          backgroundColor: kColorGreen,
          duration: const Duration(seconds: 2),
        ),
      );

      // Clean controllers
      _nameController.clear();
      _costController.clear();
      _sellingController.clear();
      _stockController.clear();
      setState(() {
        _selectedImageUrl = null;
        _selectedCategory = 'Snacks';
      });
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _costController.dispose();
    _sellingController.dispose();
    _stockController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kColorWhite,
      appBar: AppBar(
        title: const Text('Add New Product', style: TextStyle(color: kColorNavy, fontWeight: FontWeight.bold, fontSize: 18)),
        centerTitle: true,
        backgroundColor: kColorWhite,
        elevation: 0,
        scrolledUnderElevation: 0,
        actions: [
          GestureDetector(
            onTap: () {
              final nextRole = widget.userRole == 'owner' ? 'staff' : 'owner';
              widget.onRoleChanged(nextRole);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Switched to \${nextRole.toUpperCase()} role'), backgroundColor: kColorRoyal),
              );
            },
            child: Container(
              margin: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: widget.userRole == 'owner' ? const Color(0xFFE6F4EA) : const Color(0xFFFEF3C7),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: widget.userRole == 'owner' ? kColorGreen : Colors.amber),
              ),
              child: Text(
                widget.userRole == 'owner' ? 'Owner 👑' : 'Staff 👤',
                style: TextStyle(
                  color: widget.userRole == 'owner' ? kColorGreen : Colors.amber[900],
                  fontSize: 10,
                  fontWeight: FontWeight.black,
                ),
              ),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // SQUARE IMAGE PLACEHOLDER BOX AT THE TOP
              GestureDetector(
                onTap: _pickProductImage,
                child: Container(
                  height: 120,
                  margin: const EdgeInsets.only(bottom: 16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF8FAFC),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: kColorLightGray, width: 1.5),
                  ),
                  child: _selectedImageUrl != null
                      ? Stack(
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(14),
                              child: Image.network(
                                _selectedImageUrl!,
                                width: double.infinity,
                                height: double.infinity,
                                fit: BoxFit.cover,
                              ),
                            ),
                            Positioned(
                              right: 8,
                              bottom: 8,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(
                                  color: kColorNavy.withOpacity(0.8),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: const Text(
                                  'Change Photo',
                                  style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                          ],
                        )
                      : Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                shape: BoxShape.circle,
                                boxShadow: [
                                  BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4, offset: const Offset(0, 2)),
                                ],
                              ),
                              child: const Icon(Icons.add_a_photo_outlined, color: kColorRoyal, size: 22),
                            ),
                            const SizedBox(height: 8),
                            const Text(
                              'pickProductImage()',
                              style: TextStyle(color: kColorNavy, fontSize: 11, fontWeight: FontWeight.black, letterSpacing: 0.5),
                            ),
                            const SizedBox(height: 2),
                            const Text(
                              'Camera snap or Upload gallery file',
                              style: TextStyle(color: kColorGrayText, fontSize: 9),
                            ),
                          ],
                        ),
                ),
              ),

              // TAP TO SCAN BARCODE BUTTON/CARD (Royal Blue style)
              GestureDetector(
                onTap: _scanBarcode,
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
                  decoration: BoxDecoration(
                    color: kColorRoyal,
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: [
                      BoxShadow(color: kColorRoyal.withOpacity(0.2), blurRadius: 10, offset: const Offset(0, 4)),
                    ],
                  ),
                  child: Column(
                    children: const [
                      Icon(Icons.qr_code_scanner, color: Colors.white, size: 30),
                      SizedBox(height: 6),
                      Text(
                        'Tap to Scan Barcode',
                        style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold, letterSpacing: 0.5),
                      ),
                      SizedBox(height: 2),
                      Text(
                        'Auto-fills metadata securely using laser camera',
                        style: TextStyle(color: Colors.white70, fontSize: 11),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // text fields with Light Gray borders & floating labels
              TextFormField(
                controller: _nameController,
                style: const TextStyle(color: kColorNavy, fontSize: 15),
                decoration: _buildDecoration('Product Name', 'e.g. Peak Milk Can 400g'),
                validator: (v) => v == null || v.trim().isEmpty ? 'Product Name is required *' : null,
              ),
              const SizedBox(height: 16),

              // Category Dropdown field
              DropdownButtonFormField<String>(
                value: _selectedCategory,
                style: const TextStyle(color: kColorNavy, fontSize: 14),
                decoration: _buildDecoration('Product Category', 'Select department'),
                items: const [
                  DropdownMenuItem(value: 'Snacks', child: Text('🍪 Snacks & Drinks')),
                  DropdownMenuItem(value: 'Fabrics', child: Text('🧵 Fabrics & Textiles')),
                  DropdownMenuItem(value: 'Electronics', child: Text('🔌 Electronics & Devices')),
                  DropdownMenuItem(value: 'Beverages', child: Text('🥛 Beverages & Dairy')),
                ],
                onChanged: (v) {
                  if (v != null) {
                    setState(() {
                      _selectedCategory = v;
                    });
                  }
                },
              ),
              const SizedBox(height: 16),

              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _costController,
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      style: const TextStyle(color: kColorNavy, fontSize: 15),
                      decoration: _buildDecoration('Cost Price (₦)', 'e.g. 2800'),
                      validator: (v) => v == null || v.trim().isEmpty ? 'Required' : null,
                    ),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: TextFormField(
                      controller: _sellingController,
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      style: const TextStyle(color: kColorNavy, fontSize: 15),
                      decoration: _buildDecoration('Selling Price (₦)', 'e.g. 3200'),
                      validator: (v) => v == null || v.trim().isEmpty ? 'Required' : null,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              TextFormField(
                controller: _stockController,
                keyboardType: TextInputType.number,
                style: const TextStyle(color: kColorNavy, fontSize: 15),
                decoration: _buildDecoration('Initial Stock Quantity', 'e.g. 50'),
                validator: (v) => v == null || v.trim().isEmpty ? 'Stock count is required *' : null,
              ),
              const SizedBox(height: 32),

              // SAVE PRODUCT BUTTON (Kelly Green)
              ElevatedButton(
                onPressed: _submitForm,
                style: ElevatedButton.styleFrom(
                  backgroundColor: kColorGreen,
                  foregroundColor: kColorWhite,
                  elevation: 0,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text(
                  'Save Product to Inventory',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, letterSpacing: 0.5),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  InputDecoration _buildDecoration(String label, String hint) {
    return InputDecoration(
      labelText: label,
      floatingLabelBehavior: FloatingLabelBehavior.always,
      labelStyle: const TextStyle(color: kColorNavy, fontWeight: FontWeight.bold, fontSize: 13),
      hintText: hint,
      contentPadding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: kColorLightGray, width: 1.5),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: kColorNavy, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: Colors.red, width: 1),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: Colors.red, width: 2),
      ),
    );
  }
}

// ==========================================
// SCREEN B: CHECKOUT SCREEN / DIGITAL COUNTER
// ==========================================
class CheckoutScreen extends StatefulWidget {
  final List<Map<String, dynamic>> basketItems;
  final List<Map<String, dynamic>> mockProducts;
  final Function(List<Map<String, dynamic>>, String) onCheckoutComplete;
  final String userRole;
  final Function(String) onRoleChanged;

  const CheckoutScreen({
    super.key,
    required this.basketItems,
    required this.mockProducts,
    required this.onCheckoutComplete,
    required this.userRole,
    required this.onRoleChanged,
  });

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  String _selectedPaymentMethod = 'Cash'; // Cash, Bank Transfer, POS Card
  String _selectedCategory = 'All'; // All, Fabrics, Snacks, Electronics, Beverages

  double _calculateTotal() {
    double sum = 0.0;
    for (final item in widget.basketItems) {
      final qty = item['qty'] as int? ?? 0;
      final price = item['sellingPrice'] as double? ?? 0.0;
      sum += qty * price;
    }
    return sum;
  }

  void _incrementQty(String prodId) {
    final index = widget.basketItems.indexWhere((p) => p['id'] == prodId);
    if (index == -1) return;
    final parentProduct = widget.mockProducts.firstWhere((p) => p['id'] == prodId);
    final availableStock = parentProduct['currentStock'] as int;
    final activeQty = widget.basketItems[index]['qty'] as int;

    if (activeQty >= availableStock) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Cannot exceed available stock limit! Only $availableStock left.'),
          backgroundColor: Colors.amber[800],
          duration: const Duration(milliseconds: 1500),
        ),
      );
      return;
    }

    setState(() {
      widget.basketItems[index]['qty'] = activeQty + 1;
    });
  }

  void _decrementQty(String prodId) {
    final index = widget.basketItems.indexWhere((p) => p['id'] == prodId);
    if (index == -1) return;
    final activeQty = widget.basketItems[index]['qty'] as int;
    if (activeQty > 0) {
      setState(() {
        widget.basketItems[index]['qty'] = activeQty - 1;
      });
    }
  }

  void _completeCheckoutSale() {
    final activeDeals = widget.basketItems.where((element) => (element['qty'] as int) > 0).toList();
    if (activeDeals.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Current basket is empty! Increase quantities to register sales.'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    final double total = _calculateTotal();
    widget.onCheckoutComplete(activeDeals, _selectedPaymentMethod);

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Text('✓ Sale Complete!', style: TextStyle(color: kColorNavy, fontWeight: FontWeight.bold)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Recorded securely with Transaction ID:', style: TextStyle(color: Colors.grey[600], fontSize: 13)),
            const SizedBox(height: 4),
            const Text('TXN-829107-STREAM', style: TextStyle(fontWeight: FontWeight.bold, fontFamily: 'JetBrains Mono', color: kColorRoyal)),
            const Divider(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                const Text('Amount Paid:'),
                Text('₦\${total.toStringAsFixed(2)}', style: const TextStyle(fontWeight: FontWeight.bold, color: kColorGreen)),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                const Text('Method:'),
                Text(_selectedPaymentMethod, style: const TextStyle(fontWeight: FontWeight.bold)),
              ],
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx),
            style: ElevatedButton.styleFrom(backgroundColor: kColorRoyal, foregroundColor: Colors.white),
            child: const Text('Dismiss'),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryCard(String name, String icon, String label, Color color) {
    final isSelected = _selectedCategory == name;
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedCategory = name;
        });
      },
      child: Container(
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : const Color(0xFFF8FAFC),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? color : kColorLightGray,
            width: isSelected ? 2 : 1,
          ),
          boxShadow: isSelected
              ? [BoxShadow(color: color.withOpacity(0.15), blurRadius: 4, offset: const Offset(0, 2))]
              : null,
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(icon, style: const TextStyle(fontSize: 18)),
            const SizedBox(height: 2),
            Text(
              label,
              style: TextStyle(
                color: isSelected ? color : kColorGrayText,
                fontSize: 9,
                fontWeight: FontWeight.black,
              ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final total = _calculateTotal();
    final filteredBasketItems = widget.basketItems.where((item) {
      if (_selectedCategory == 'All') return true;
      final parent = widget.mockProducts.firstWhere((p) => p['id'] == item['id'], orElse: () => {});
      return parent['category'] == _selectedCategory;
    }).toList();

    return Scaffold(
      backgroundColor: kColorWhite,
      appBar: AppBar(
        title: const Text('Current Basket', style: TextStyle(color: kColorNavy, fontWeight: FontWeight.bold, fontSize: 18)),
        centerTitle: false,
        backgroundColor: kColorWhite,
        elevation: 0,
        scrolledUnderElevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_active_outlined, color: kColorRoyal),
            tooltip: 'View Staff History',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const NotificationLogsScreen()),
              );
            },
          ),
          GestureDetector(
            onTap: () {
              final nextRole = widget.userRole == 'owner' ? 'staff' : 'owner';
              widget.onRoleChanged(nextRole);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Switched to \${nextRole.toUpperCase()} role'),
                  backgroundColor: kColorRoyal,
                  duration: const Duration(milliseconds: 1000),
                ),
              );
            },
            child: Container(
              margin: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: widget.userRole == 'owner' ? const Color(0xFFE6F4EA) : const Color(0xFFFEF3C7),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: widget.userRole == 'owner' ? kColorGreen : Colors.amber),
              ),
              child: Text(
                widget.userRole == 'owner' ? 'Owner 👑' : 'Staff 👤',
                style: TextStyle(
                  color: widget.userRole == 'owner' ? kColorGreen : Colors.amber[900],
                  fontSize: 10,
                  fontWeight: FontWeight.black,
                ),
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.refresh_rounded, color: kColorNavy),
            onPressed: () {
              setState(() {
                for (var item in widget.basketItems) {
                  item['qty'] = 0;
                }
              });
            },
          )
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                const Text(
                  'BROWSE DEPARTMENTS',
                  style: TextStyle(
                    color: kColorNavy,
                    fontWeight: FontWeight.black,
                    fontSize: 10,
                    letterSpacing: 0.5,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: kColorRoyal.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Text(
                    'GridView.count',
                    style: TextStyle(color: kColorRoyal, fontSize: 8, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
          Container(
            height: 82,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: GridView.count(
              crossAxisCount: 1,
              scrollDirection: Axis.horizontal,
              mainAxisSpacing: 8,
              childAspectRatio: 0.8,
              children: [
                _buildCategoryCard('All', '📦', 'All', kColorRoyal),
                _buildCategoryCard('Fabrics', '🧵', 'Fabrics', Colors.purple),
                _buildCategoryCard('Snacks', '🍪', 'Snacks', Colors.orange),
                _buildCategoryCard('Electronics', '🔌', 'Electronics', Colors.blue),
                _buildCategoryCard('Beverages', '🥛', 'Drinks', Colors.teal),
              ],
            ),
          ),
          const Divider(color: kColorLightGray, height: 16),
          Expanded(
            child: filteredBasketItems.isEmpty
                ? Center(
                    child: Text(
                      'No products in "\$_selectedCategory" category.',
                      style: const TextStyle(color: kColorGrayText, fontSize: 13),
                    ),
                  )
                : ListView.separated(
                    itemCount: filteredBasketItems.length,
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    separatorBuilder: (ctx, idx) => const Divider(color: kColorLightGray),
                    itemBuilder: (ctx, index) {
                      final item = filteredBasketItems[index];
                      final qty = item['qty'] as int? ?? 0;
                      final price = item['sellingPrice'] as double? ?? 0.0;
                      final parentProduct = widget.mockProducts.firstWhere((p) => p['id'] == item['id']);
                      final currentStock = parentProduct['currentStock'] as int;

                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4),
                        child: Row(
                          children: [
                            Container(
                              width: 44,
                              height: 44,
                              margin: const EdgeInsets.only(right: 12),
                              decoration: BoxDecoration(
                                color: const Color(0xFFF1F5F9),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: parentProduct['imageUrl'] != null
                                    ? Image.network(parentProduct['imageUrl'], fit: BoxFit.cover, errorBuilder: (ctx, err, stack) => const Icon(Icons.image_outlined, color: kColorGrayText, size: 20))
                                    : const Icon(Icons.image_outlined, color: kColorGrayText, size: 20),
                              ),
                            ),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    item['productName'],
                                    style: const TextStyle(color: kColorNavy, fontWeight: FontWeight.bold, fontSize: 14),
                                  ),
                                  const SizedBox(height: 2),
                                  Row(
                                    children: [
                                      Text('₦\${price.toStringAsFixed(2)}', style: const TextStyle(color: kColorRoyal, fontWeight: FontWeight.bold, fontSize: 12)),
                                      const SizedBox(width: 8),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: currentStock <= 5 ? Colors.red[50] : Colors.blue[50],
                                          borderRadius: BorderRadius.circular(4),
                                        ),
                                        child: Text(
                                          'Stock: \$currentStock',
                                          style: TextStyle(
                                            color: currentStock <= 5 ? Colors.red[700] : Colors.blue[700],
                                            fontSize: 10,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                            Row(
                              children: [
                                IconButton(
                                  onPressed: () => _decrementQty(item['id']),
                                  icon: const Icon(Icons.remove_circle_outline, color: kColorNavy),
                                  constraints: const BoxConstraints(minWidth: 40, minHeight: 40),
                                ),
                                Container(
                                  minWidth: 30,
                                  alignment: Alignment.center,
                                  child: Text(
                                    '\$qty',
                                    style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: kColorNavy, fontFamily: 'JetBrains Mono'),
                                  ),
                                ),
                                IconButton(
                                  onPressed: () => _incrementQty(item['id']),
                                  icon: const Icon(Icons.add_circle_outline, color: kColorNavy),
                                  constraints: const BoxConstraints(minWidth: 40, minHeight: 40),
                                ),
                              ],
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              border: const Border(top: BorderSide(color: kColorLightGray)),
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 4, offset: const Offset(0, -2))
              ],
            ),
            child: SafeArea(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Row(
                    children: [
                      const Text('Pay Method: ', style: TextStyle(color: kColorNavy, fontWeight: FontWeight.bold, fontSize: 11)),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: ['Cash', 'Bank Transfer', 'POS Card'].map((method) {
                            final isSel = _selectedPaymentMethod == method;
                            return ChoiceChip(
                              label: Text(method, style: TextStyle(color: isSel ? Colors.white : kColorNavy, fontSize: 10, fontWeight: FontWeight.bold)),
                              selected: isSel,
                              selectedColor: kColorNavy,
                              backgroundColor: Colors.white,
                              side: const BorderSide(color: kColorLightGray),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                              onSelected: (selected) {
                                if (selected) {
                                  setState(() => _selectedPaymentMethod = method);
                                }
                              },
                            );
                          }).toList(),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      const Text('Total:', style: TextStyle(color: kColorNavy, fontSize: 15, fontWeight: FontWeight.bold)),
                      Text(
                        '₦\${total.toStringAsFixed(2)}',
                        style: const TextStyle(color: kColorNavy, fontSize: 24, fontWeight: FontWeight.black, fontFamily: 'JetBrains Mono'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  ElevatedButton(
                    onPressed: _completeCheckoutSale,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: kColorRoyal,
                      foregroundColor: kColorWhite,
                      elevation: 0,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: const Text('Complete Sale', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                 // ==========================================
// SCREEN C: LOW STOCK ALERTS TRACKING STREAM
// ==========================================
class LowStockAlertScreen extends StatelessWidget {
  final List<Map<String, dynamic>> mockProducts;
  final String userRole;
  final Function(String) onRoleChanged;

  const LowStockAlertScreen({
    super.key,
    required this.mockProducts,
    required this.userRole,
    required this.onRoleChanged,
  });

  @override
  Widget build(BuildContext context) {
    final lowStockItems = mockProducts.where((p) => (p['currentStock'] as int) <= 5).toList();

    return Scaffold(
      backgroundColor: kColorWhite,
      appBar: AppBar(
        title: const Text('Low Stock Alerts', style: TextStyle(color: kColorNavy, fontWeight: FontWeight.bold, fontSize: 18)),
        centerTitle: true,
        backgroundColor: kColorWhite,
        elevation: 0,
        scrolledUnderElevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_active_outlined, color: kColorRoyal),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const NotificationLogsScreen()),
              );
            },
          ),
          GestureDetector(
            onTap: () {
              final nextRole = userRole == 'owner' ? 'staff' : 'owner';
              onRoleChanged(nextRole);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Switched to \${nextRole.toUpperCase()} role'), backgroundColor: kColorRoyal),
              );
            },
            child: Container(
              margin: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: userRole == 'owner' ? const Color(0xFFE6F4EA) : const Color(0xFFFEF3C7),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: userRole == 'owner' ? kColorGreen : Colors.amber),
              ),
              child: Text(
                userRole == 'owner' ? 'Owner 👑' : 'Staff 👤',
                style: TextStyle(
                  color: userRole == 'owner' ? kColorGreen : Colors.amber[900],
                  fontSize: 10,
                  fontWeight: FontWeight.black,
                ),
              ),
            ),
          ),
        ],
      ),
      body: lowStockItems.isEmpty
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(32.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: const [
                    Icon(Icons.check_circle_outline, color: kColorGreen, size: 64),
                    SizedBox(height: 14),
                    Text(
                      'All Stock Levels Healthy!',
                      style: TextStyle(color: kColorNavy, fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 6),
                    Text(
                      'No products are currently critical or at <= 5 stock counts.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: kColorGrayText, fontSize: 12),
                    ),
                  ],
                ),
              ),
            )
          : ListView.builder(
              itemCount: lowStockItems.length,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              itemBuilder: (ctx, idx) {
                final prod = lowStockItems[idx];
                final stock = prod['currentStock'] as int;

                return Container(
                  margin: const EdgeInsets.symmetric(vertical: 6),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.red[50],
                    border: Border.all(color: Colors.red[200]!),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.warning_amber_rounded, color: Colors.red, size: 28),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              prod['productName'],
                              style: const TextStyle(fontWeight: FontWeight.bold, color: kColorNavy, fontSize: 14),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              '₦\${(prod['sellingPrice'] as double).toStringAsFixed(2)} • Selling Value',
                              style: const TextStyle(color: kColorGrayText, fontSize: 11),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(color: Colors.red, borderRadius: BorderRadius.circular(8)),
                        child: Text(
                          '\$stock units',
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12, fontFamily: 'JetBrains Mono'),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}

// ==========================================
// SCREEN D: DAILY OR HISTORIC PDF REPORTS PANEL WITH ACCESS SECURITY
// ==========================================
class ReportsScreen extends StatelessWidget {
  final String userRole;
  final Function(String) onRoleChanged;
  
  const ReportsScreen({
    super.key,
    required this.userRole,
    required this.onRoleChanged,
  });

  @override
  Widget build(BuildContext context) {
    if (userRole == 'staff') {
      return Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          title: const Text('Daily Performance Reports', style: TextStyle(color: kColorNavy, fontWeight: FontWeight.bold, fontSize: 16)),
          centerTitle: true,
          backgroundColor: Colors.white,
          elevation: 0,
          scrolledUnderElevation: 0,
          actions: [
            GestureDetector(
              onTap: () {
                onRoleChanged('owner');
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('👑 Switched to OWNER mode'), backgroundColor: kColorGreen),
                );
              },
              child: Container(
                margin: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFFFEF3C7),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.amber),
                ),
                child: Text('Staff 👤', style: TextStyle(color: Colors.amber[900], fontSize: 10, fontWeight: FontWeight.black)),
              ),
            ),
          ],
        ),
        body: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.amber[50],
                    shape: BoxShape.circle,
                  ),
                  child: Icon(Icons.shield_outlined, color: Colors.amber[700], size: 48),
                ),
                const SizedBox(height: 20),
                const Text(
                  'ACCESS RESTRICTED',
                  style: TextStyle(color: kColorNavy, fontWeight: FontWeight.black, fontSize: 16, letterSpacing: 0.5),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                const Text(
                  'Staff Mode Profile',
                  style: TextStyle(color: kColorRoyal, fontWeight: FontWeight.bold, fontSize: 12),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 12),
                Text(
                  "Your active Firebase user profile is classified as 'staff'. Daily cash performance metrics, profit statements, and net revenue reports are strictly restricted to owners.",
                  style: TextStyle(color: Colors.grey[600], fontSize: 12, height: 1.5),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 24),
                ElevatedButton.icon(
                  onPressed: () {
                    onRoleChanged('owner');
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('👑 Switched to OWNER mode'), backgroundColor: kColorGreen),
                    );
                  },
                  icon: const Icon(Icons.admin_panel_settings, color: Colors.white, size: 16),
                  label: const Text('Elevate to Owner Role (Demo)'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: kColorNavy,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('PDF Reports Desk', style: TextStyle(color: kColorNavy, fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
        scrolledUnderElevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_active_outlined, color: kColorRoyal),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const NotificationLogsScreen()),
              );
            },
          ),
          GestureDetector(
            onTap: () {
              onRoleChanged('staff');
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('👤 Switched to STAFF mode'), backgroundColor: Colors.amber),
              );
            },
            child: Container(
              margin: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: const Color(0xFFE6F4EA),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: kColorGreen),
              ),
              child: const Text('Owner 👑', style: TextStyle(color: kColorGreen, fontSize: 10, fontWeight: FontWeight.black)),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: kColorRoyal.withOpacity(0.05),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: kColorRoyal.withOpacity(0.15)),
              ),
              child: const Row(
                children: [
                   Icon(Icons.auto_awesome, color: kColorRoyal, size: 20),
                   SizedBox(width: 12),
                   Expanded(
                     child: Column(
                       crossAxisAlignment: CrossAxisAlignment.start,
                       children: [
                         Text(
                           'Automated Cloud Backup',
                           style: TextStyle(color: kColorRoyal, fontWeight: FontWeight.bold, fontSize: 12),
                         ),
                         SizedBox(height: 2),
                         Text(
                           'Daily cash register statements save automatically to Firestore nightly.',
                           style: TextStyle(color: kColorGrayText, fontSize: 10),
                         ),
                       ],
                     ),
                   ),
                ],
              ),
            ),
            const SizedBox(height: 18),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: kColorLightGray),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: kColorRoyal.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Icon(Icons.picture_as_pdf, color: kColorRoyal, size: 24),
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Daily Performance Report',
                              style: TextStyle(color: kColorNavy, fontWeight: FontWeight.bold, fontSize: 14),
                            ),
                            SizedBox(height: 2),
                            Text('Date: Today Active Stream', style: TextStyle(color: kColorGrayText, fontSize: 10)),
                          ],
                        ),
                      ),
                      ElevatedButton.icon(
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('📄 Mocking Report Print Preview...'), backgroundColor: kColorRoyal),
                          );
                        },
                        icon: const Icon(Icons.download_rounded, size: 14),
                        label: const Text('Download', style: TextStyle(fontSize: 10)),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: kColorRoyal,
                          foregroundColor: Colors.white,
                          elevation: 0,
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                      ),
                    ],
                  ),
                  const Divider(height: 24, color: kColorLightGray),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      _buildMiniStat('REVENUE', '₦24,800', kColorNavy),
                      _buildMiniStat('NET PROFIT', '₦3,800', kColorGreen),
                      _buildMiniStat('UNIT ITEMS', '5 sold', kColorRoyal),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            const Text(
              'PAST REPORTS STREAM',
              style: TextStyle(color: kColorNavy, fontWeight: FontWeight.black, fontSize: 10, letterSpacing: 0.5),
            ),
            const SizedBox(height: 10),

            _buildPastReportRow(context, '2026-06-18.pdf', 'Revenue: ₦54,200 • Profit: ₦11,600'),
            const SizedBox(height: 8),
            _buildPastReportRow(context, '2026-06-17.pdf', 'Revenue: ₦42,000 • Profit: ₦7,200'),
          ],
        ),
      ),
    );
  }

  Widget _buildMiniStat(String label, String value, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(color: kColorGrayText, fontSize: 8, fontWeight: FontWeight.bold, letterSpacing: 0.5)),
        const SizedBox(height: 4),
        Text(value, style: TextStyle(color: color, fontSize: 13, fontWeight: FontWeight.black, fontFamily: 'JetBrains Mono')),
      ],
    );
  }

  Widget _buildPastReportRow(BuildContext context, String filename, String summary) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: kColorLightGray),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.between,
        children: [
          Row(
            children: [
              const Icon(Icons.insert_drive_file_outlined, color: kColorGrayText, size: 20),
              const SizedBox(width: 10),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(filename, style: const TextStyle(color: kColorNavy, fontWeight: FontWeight.bold, fontSize: 12)),
                  const SizedBox(height: 2),
                  Text(summary, style: const TextStyle(color: kColorGrayText, fontSize: 9)),
                ],
              ),
            ],
          ),
          IconButton(
            icon: const Icon(Icons.download_for_offline_outlined, color: kColorRoyal, size: 20),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('📄 Fetching archival file: \$filename...'), backgroundColor: kColorGreen),
              );
            },
          ),
        ],
      ),
    );
  }
}

// ==========================================
// EXTENSIONAL SCREEN E: OWNER NOTIFICATION FEED RECORD TIMELINES
// ==========================================
class NotificationLogsScreen extends StatelessWidget {
  const NotificationLogsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Map<String, String>> logs = [
      {
        'title': 'Sale Complete',
        'desc': 'Staff Blessing completed a ₦20,000 POS sale',
        'time': 'Just now',
        'category': 'sales'
      },
      {
        'title': 'Inventory Restocked',
        'desc': 'Staff Jude added 50 units of Ankara Fabric',
        'time': '18 mins ago',
        'category': 'inventory'
      },
      {
        'title': 'Stock Adjusted',
        'desc': 'Staff Blessing adjusted Peak Milk stock count (-2)',
        'time': '1 hr ago',
        'category': 'adjust'
      },
      {
        'title': 'Sale Complete',
        'desc': 'Staff Jude completed a ₦6,000 Cash sale',
        'time': '2 hrs ago',
        'category': 'sales'
      },
    ];

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Owner Activity Desk', style: TextStyle(color: kColorNavy, fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
        scrolledUnderElevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: kColorNavy),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: const Color(0xFFF8FAFC),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(6),
                  decoration: BoxDecoration(
                    color: kColorNavy.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: const Icon(Icons.security, size: 16, color: kColorNavy),
                ),
                const SizedBox(width: 10),
                const Text(
                  'LIVE ACTIVITY LOGS STREAM',
                  style: TextStyle(color: kColorNavy, fontWeight: FontWeight.black, fontSize: 10, letterSpacing: 0.5),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.separated(
              itemCount: logs.length,
              padding: const EdgeInsets.all(16),
              separatorBuilder: (context, index) => const Divider(color: kColorLightGray, height: 24),
              itemBuilder: (context, index) {
                final log = logs[index];
                IconData icon;
                Color iconBg;
                Color iconColor;

                if (log['category'] == 'sales') {
                  icon = Icons.monetization_on_outlined;
                  iconBg = const Color(0xFFE6F4EA);
                  iconColor = kColorGreen;
                } else if (log['category'] == 'inventory') {
                  icon = Icons.inventory_2_outlined;
                  iconBg = const Color(0xFFF3E8FF);
                  iconColor = Colors.purple;
                } else {
                  icon = Icons.edit_note_outlined;
                  iconBg = const Color(0xFFE8F0FE);
                  iconColor = kColorRoyal;
                }

                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: iconBg,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Icon(icon, color: iconColor, size: 20),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            log['desc']!,
                            style: const TextStyle(color: kColorNavy, fontSize: 13, fontWeight: FontWeight.bold, height: 1.3),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            log['time']!,
                            style: const TextStyle(color: kColorGrayText, fontSize: 11),
                          ),
                        ],
                      ),
                    ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
*/
`;

export const BACKEND_REPORT_FUNCTION = `const functions = require("firebase-functions");
const admin = require("firebase-admin");
const PDFDocument = require("pdfkit");
const path = require("path");
const os = require("os");
const fs = require("fs");

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp();
}

/**
 * Cloud Scheduled Function triggered nightly at 11:59 PM Lagos local time.
 * Calculates daily transactions, revenue, profit, stock, compiles a PDF
 * matching the Navy/Blue brand colors, saves it to Firebase Storage,
 * and catalogs the metadata in the "daily_reports" Firestore collection.
 */
exports.generateDailyReport = functions.pubsub
  .schedule('59 23 * * *')
  .timeZone('Africa/Lagos')
  .onRun(async (context) => {
    const db = admin.firestore();
    const storage = admin.storage().bucket();
    
    // 1. Establish the current date window (midnight to 23:59:59 PM today)
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // e.g. "2026-06-18"
    
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
    console.log(\\\`Starting daily report compiling engine for range: \\\${startOfDay.toISOString()} to \\\${endOfDay.toISOString()}\\\`);

    try {
      // Fetch all retail users (each store owner requires a distinct private report compiles)
      const usersSnapshot = await db.collection('users').get();
      if (usersSnapshot.empty) {
        console.log('No registered store accounts located to generate reports for.');
        return null;
      }

      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const storeName = userDoc.data().businessName || 'Corner Streams Partner Shop';

        // A. Query sales transactions logged today by this specific user
        const salesSnapshot = await db.collection('sales')
          .where('userId', '==', userId)
          .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(startOfDay))
          .where('createdAt', '<=', admin.firestore.Timestamp.fromDate(endOfDay))
          .get();

        // B. Query active product inventory items representing current stock
        const productsSnapshot = await db.collection('products')
          .where('userId', '==', userId)
          .get();

        // C. Construct products cost map and calculate metrics
        const productCostMap = {};
        const lowStockItems = [];
        
        productsSnapshot.forEach((doc) => {
          const data = doc.data();
          const prodId = doc.id;
          productCostMap[prodId] = {
            costPrice: Number(data.costPrice || 0),
            sellingPrice: Number(data.sellingPrice || 0),
            productName: data.productName || 'Unnamed Item'
          };

          // Collect low stock list (currentStock <= 5)
          const currentStock = Number(data.currentStock || 0);
          if (currentStock <= 5) {
            lowStockItems.push({
              name: data.productName || 'Unnamed Item',
              stock: currentStock,
              price: Number(data.sellingPrice || 0)
            });
          }
        });

        let totalRevenue = 0;
        let totalCost = 0;
        let totalItemsSold = 0;
        const salesReportList = [];

        salesSnapshot.forEach((doc) => {
          const data = doc.data();
          const qty = Number(data.quantitySold || 0);
          const price = Number(data.sellingPrice || 0);
          const amount = Number(data.totalAmount || (qty * price));
          
          totalRevenue += amount;
          totalItemsSold += qty;

          // Attempt to retrieve original cost unit price to isolate net profit margins
          const prodId = data.productId;
          const costUnit = productCostMap[prodId] ? productCostMap[prodId].costPrice : (price * 0.8); // fallback: 20% margin
          const totalCostAmount = costUnit * qty;
          totalCost += totalCostAmount;

          salesReportList.push({
            name: data.productName || 'Unknown Item',
            qty: qty,
            price: price,
            total: amount,
            profit: amount - totalCostAmount
          });
        });

        const totalProfit = totalRevenue - totalCost;

        // Skip compiling if there are no products and no sales (inactive demo accounts)
        if (salesSnapshot.empty && productsSnapshot.empty) {
          console.log(\\\`Skipping idle user \\\${userId} (no database records found).\\\`);
          continue;
        }

        // D. Build High-Fidelity PDF using local disk buffer
        const tempFilePath = path.join(os.tmpdir(), \\\`report_\\\${userId}_\\\${dateStr}.pdf\\\`);
        const doc = new PDFDocument({ margin: 40, size: 'A4' });
        const writeStream = fs.createWriteStream(tempFilePath);
        doc.pipe(writeStream);

        // --- PDF DESIGN PALETTE ---
        const colorNavy = '#0A2540';
        const colorRoyal = '#0052CC';
        const colorGreen = '#00875A';
        const colorSlate = '#64748B';
        const colorLightGray = '#F1F5F9';

        // 1. Navy Header Banner Background
        doc.rect(0, 0, 595.28, 120)
           .fill(colorNavy);

        // Header brand elements
        doc.fillColor('#FFFFFF')
           .fontSize(22)
           .font('Helvetica-Bold')
           .text('CORNER STREAMS', 40, 30, { characterSpacing: 1 });

        doc.fontSize(10)
           .font('Helvetica-Bold')
           .fillColor('#00D2D2') // Cyan brand accessory accent
           .text('BUSINESS REMOTES & POS REGISTER', 40, 55, { characterSpacing: 2 });

        doc.fontSize(11)
           .font('Helvetica')
           .fillColor('#E2E8F0')
           .text(\\\`DAILY PERFORMANCE REPORT • \\\${dateStr}\\\`, 40, 75);

        // Store identity right aligned
        doc.fillColor('#FFFFFF')
           .fontSize(12)
           .font('Helvetica-Bold')
           .text(storeName.toUpperCase(), 350, 40, { width: 200, align: 'right' });
        doc.fontSize(8)
           .font('Helvetica')
           .fillColor('#CBD5E1')
           .text(\\\`Owner ID: \\\${userId}\\\`, 350, 58, { width: 200, align: 'right' });

        // Move cursor down
        doc.y = 150;

        // 2. Metrics Bento-Grid Summaries (Boxes layout)
        doc.fontSize(14)
           .font('Helvetica-Bold')
           .fillColor(colorNavy)
           .text('Key Performance Indicators (KPIs)', 40, 150);

        // Draw 3 metric boxes side-by-side
        const boxWidth = 155;
        const boxHeight = 75;
        const boxY = 175;

        // Box 1: Revenue (Navy border, bold text)
        doc.roundedRect(40, boxY, boxWidth, boxHeight, 8).fillAndStroke('#FFFFFF', '#E2E8F0');
        doc.fontSize(8).fillColor(colorSlate).text('TOTAL REVENUE', 50, boxY + 15);
        doc.fontSize(15).font('Helvetica-Bold').fillColor(colorNavy).text(\\\`NGN \\\${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}\\\`, 50, boxY + 32);

        // Box 2: Profit (White fill, Green accent text for positive margins)
        doc.roundedRect(210, boxY, boxWidth, boxHeight, 8).fillAndStroke('#FFFFFF', '#E2E8F0');
        doc.fontSize(8).font('Helvetica').fillColor(colorSlate).text('NET STORE PROFIT', 220, boxY + 15);
        
        // Highlight high profit with green accents
        const profitColor = totalProfit >= 5000 ? colorGreen : colorRoyal;
        doc.fontSize(15).font('Helvetica-Bold').fillColor(profitColor).text(\\\`NGN \\\${totalProfit.toLocaleString(undefined, {minimumFractionDigits: 2})}\\\`, 220, boxY + 32);

        // Box 3: Volume & Items
        doc.roundedRect(380, boxY, boxWidth, boxHeight, 8).fillAndStroke('#FFFFFF', '#E2E8F0');
        doc.fontSize(8).font('Helvetica').fillColor(colorSlate).text('ITEMS COMPLETED', 390, boxY + 15);
        doc.fontSize(15).font('Helvetica-Bold').fillColor(colorNavy).text(\\\`\\\${totalItemsSold} Sold\\\`, 390, boxY + 32);

        // 3. Sales Breakdown Table
        doc.y = 275;
        doc.fontSize(13)
           .font('Helvetica-Bold')
           .fillColor(colorNavy)
           .text('Completed Register Sales', 40, 275);

        // Draw Table Header
        const tableY = 295;
        doc.rect(40, tableY, 515, 20).fill(colorLightGray);
        doc.fontSize(8).font('Helvetica-Bold').fillColor(colorNavy);
        doc.text('PRODUCT SPECIFICATION', 50, tableY + 6);
        doc.text('QTY', 280, tableY + 6, { width: 30, align: 'center' });
        doc.text('SELLING PRICE', 320, tableY + 6, { width: 80, align: 'right' });
        doc.text('TOTAL VALUE', 410, tableY + 6, { width: 80, align: 'right' });
        doc.text('MARGIN', 500, tableY + 6, { width: 45, align: 'right' });

        let currentY = tableY + 20;
        doc.fontSize(8).font('Helvetica').fillColor('#334155');

        if (salesReportList.length === 0) {
          doc.text('No cash register transactions completed today.', 50, currentY + 10, { italic: true });
          currentY += 30;
        } else {
          salesReportList.forEach((sale) => {
            doc.text(sale.name, 50, currentY + 6, { width: 220, truncate: true });
            doc.text(sale.qty.toString(), 280, currentY + 6, { width: 30, align: 'center' });
            doc.text(\\\`NGN \\\${sale.price.toLocaleString()}\\\`, 320, currentY + 6, { width: 80, align: 'right' });
            doc.text(\\\`NGN \\\${sale.total.toLocaleString()}\\\`, 410, currentY + 6, { width: 80, align: 'right' });
            doc.text(\\\`NGN \\\${sale.profit.toLocaleString()}\\\`, 500, currentY + 6, { width: 45, align: 'right', fillColor: colorGreen });
            
            // Subtle horizontal line separation
            doc.strokeColor('#F1F5F9').lineWidth(0.5).moveTo(40, currentY + 20).lineTo(555, currentY + 20).stroke();
            currentY += 20;
          });
        }

        // 4. Low Stock Advisory Section
        currentY += 15;
        doc.fontSize(13)
           .font('Helvetica-Bold')
           .fillColor(colorNavy)
           .text('Low Stock Advisory Logs (Alert threshold: <= 5 qty)', 40, currentY);

        currentY += 20;

        if (lowStockItems.length === 0) {
          doc.rect(40, currentY, 515, 30).fill('#ECFDF5');
          doc.fontSize(8).font('Helvetica-Bold').fillColor(colorGreen).text('✓ All store products are healthy. Zero inventory items have crossed below 5 stock limits.', 50, currentY + 10);
          currentY += 40;
        } else {
          lowStockItems.forEach((item) => {
            // Draw red block alert indicator
            doc.rect(40, currentY, 4, 18).fill('#EF4444');
            doc.fontSize(8).font('Helvetica-Bold').fillColor('#7F1D1D').text(item.name, 52, currentY + 4);
            doc.fontSize(8).font('Helvetica').fillColor(colorSlate).text(\\\`Remaining: \\\${item.stock} units  |  Price: NGN \\\${item.price.toLocaleString()}\\\`, 350, currentY + 4, { width: 200, align: 'right' });
            currentY += 22;
          });
        }

        // 5. Professional Footer Stamp
        doc.rect(40, 770, 515, 0.5).fill('#CBD5E1');
        doc.fontSize(8).font('Helvetica').fillColor(colorSlate);
        doc.text('Corner Streams Remotes Reporting Service • Generated Atomically ServerSide • Protected via Firebase Security', 40, 780, { width: 400 });
        doc.text('Page 1 of 1', 480, 780, { width: 75, align: 'right' });

        doc.end();

        // Wait for PDFKit document streams writing to finish
        await new Promise((resolve, reject) => {
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        // E. Save PDF file securely to Cloud Storage Bucket
        const destinationPath = \\\`reports/\\\${userId}/\\\${dateStr}.pdf\\\`;
        console.log(\\\`Uploading generated report PDF to Storage bucket: \\\${destinationPath}\\\`);
        
        const uploadResult = await storage.upload(tempFilePath, {
          destination: destinationPath,
          metadata: {
            contentType: 'application/pdf',
            metadata: {
              firebaseStorageDownloadTokens: userId + '_token_' + Date.now() // Token generator
            }
          }
        });

        // Build a highly reliable Public Firebase Storage URL format
        const uploadedFile = uploadResult[0];
        const bucketName = storage.name;
        const encodedPath = encodeURIComponent(destinationPath);
        const downloadToken = uploadedFile.metadata.metadata.firebaseStorageDownloadTokens;
        
        const publicDownloadLink = \\\`https://firebasestorage.googleapis.com/v0/b/\\\${bucketName}/o/\\\${encodedPath}?alt=media&token=\\\${downloadToken}\\\`;

        // F. Create a persistent catalog document in Firestore "daily_reports" collection
        await db.collection('daily_reports').add({
          userId: userId,
          reportDate: dateStr,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          pdfUrl: publicDownloadLink,
          metrics: {
            totalRevenue: totalRevenue,
            totalProfit: totalProfit,
            itemsSold: totalItemsSold,
            lowStockItemCount: lowStockItems.length
          }
        });

        // G. Clean up transient local system temp files
        fs.unlinkSync(tempFilePath);
        console.log(\\\`Successfully completed and stored report sequence for owner: \\\${userId}\\\`);
      }

      console.log('Daily reports compiled perfectly for all business locations!');
      return null;
    } catch (err) {
      console.error('Critical failures in cloud scheduled report generation:', err);
      throw err;
    }
  });
`;

