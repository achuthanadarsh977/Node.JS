// QR Code Generator - Node.js Server
// Install dependencies: npm install express qrcode

const express = require('express');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API endpoint to generate QR code
app.post('/api/generate-qr', async (req, res) => {
  try {
    const { data, type } = req.body;
    
    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    let qrData = data;
    
    // Format data based on type
    if (type === 'url' && !data.startsWith('http://') && !data.startsWith('https://')) {
      qrData = 'https://' + data;
    } else if (type === 'contact') {
      const contact = JSON.parse(data);
      qrData = `BEGIN:VCARD
VERSION:3.0
FN:${contact.firstName} ${contact.lastName}
N:${contact.lastName};${contact.firstName};;;
ORG:${contact.organization}
TEL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.url}
END:VCARD`;
    }

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    res.json({ 
      success: true, 
      qrCode: qrCodeDataUrl,
      data: qrData 
    });

  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Serve the HTML interface
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QR Code Generator</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .header h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 10px;
    }
    
    .header p {
      color: #718096;
      font-size: 1.1rem;
    }
    
    .card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .tabs {
      display: flex;
      border-bottom: 2px solid #e2e8f0;
    }
    
    .tab {
      flex: 1;
      padding: 20px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      color: #718096;
      transition: all 0.3s;
    }
    
    .tab.active {
      color: #5a67d8;
      border-bottom: 3px solid #5a67d8;
      background: #f7fafc;
    }
    
    .tab:hover {
      background: #f7fafc;
    }
    
    .content {
      padding: 40px;
    }
    
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    
    @media (max-width: 768px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #2d3748;
    }
    
    input, textarea {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 10px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    input:focus, textarea:focus {
      outline: none;
      border-color: #5a67d8;
    }
    
    textarea {
      resize: vertical;
      min-height: 100px;
    }
    
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    
    button {
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
    }
    
    .btn-secondary {
      background: #f7fafc;
      color: #4a5568;
    }
    
    .btn-secondary:hover {
      background: #e2e8f0;
    }
    
    .qr-display {
      text-align: center;
    }
    
    .qr-container {
      background: #f7fafc;
      border-radius: 15px;
      padding: 40px;
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .qr-placeholder {
      color: #a0aec0;
    }
    
    .qr-image {
      max-width: 300px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .qr-actions {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    
    .qr-data {
      margin-top: 20px;
      background: #f7fafc;
      padding: 15px;
      border-radius: 10px;
      font-size: 0.85rem;
      color: #4a5568;
      max-height: 150px;
      overflow-y: auto;
      text-align: left;
      word-break: break-all;
    }
    
    .tab-content {
      display: none;
    }
    
    .tab-content.active {
      display: block;
    }
    
    .help-text {
      font-size: 0.85rem;
      color: #718096;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔳 QR Code Generator</h1>
      <p>Generate QR codes for URLs, text, and contact information</p>
    </div>
    
    <div class="card">
      <div class="tabs">
        <button class="tab active" onclick="switchTab('url')">🔗 URL</button>
        <button class="tab" onclick="switchTab('text')">💬 Text</button>
        <button class="tab" onclick="switchTab('contact')">👤 Contact</button>
      </div>
      
      <div class="content">
        <div class="grid">
          <!-- Input Section -->
          <div>
            <!-- URL Tab -->
            <div id="url-tab" class="tab-content active">
              <h2 style="margin-bottom: 20px;">Enter URL</h2>
              <div class="form-group">
                <label>Website URL</label>
                <input type="url" id="url-input" placeholder="example.com or https://example.com">
                <p class="help-text">We'll automatically add https:// if needed</p>
              </div>
            </div>
            
            <!-- Text Tab -->
            <div id="text-tab" class="tab-content">
              <h2 style="margin-bottom: 20px;">Enter Text</h2>
              <div class="form-group">
                <label>Text Content</label>
                <textarea id="text-input" placeholder="Enter any text to generate QR code..."></textarea>
              </div>
            </div>
            
            <!-- Contact Tab -->
            <div id="contact-tab" class="tab-content">
              <h2 style="margin-bottom: 20px;">Contact Information</h2>
              <div class="grid-2">
                <div class="form-group">
                  <label>First Name</label>
                  <input type="text" id="contact-firstname" placeholder="John">
                </div>
                <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" id="contact-lastname" placeholder="Doe">
                </div>
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="tel" id="contact-phone" placeholder="+1 (555) 123-4567">
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" id="contact-email" placeholder="john.doe@example.com">
              </div>
              <div class="form-group">
                <label>Organization</label>
                <input type="text" id="contact-org" placeholder="Company Name">
              </div>
              <div class="form-group">
                <label>Website</label>
                <input type="url" id="contact-url" placeholder="https://example.com">
              </div>
            </div>
            
            <button class="btn-secondary" onclick="clearForm()">Clear All Fields</button>
          </div>
          
          <!-- QR Display Section -->
          <div class="qr-display">
            <h2 style="margin-bottom: 20px;">Generated QR Code</h2>
            <div class="qr-container" id="qr-container">
              <div class="qr-placeholder">
                <p style="font-size: 3rem; margin-bottom: 10px;">🔳</p>
                <p>Fill in the form to generate your QR code</p>
              </div>
            </div>
            <div id="qr-actions" style="display: none;">
              <div class="qr-actions">
                <button class="btn-primary" onclick="downloadQR()">📥 Download</button>
                <button class="btn-secondary" onclick="copyData()">📋 Copy Data</button>
              </div>
              <div class="qr-data" id="qr-data"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    let currentTab = 'url';
    let currentQRData = '';
    let currentQRImage = '';
    
    function switchTab(tab) {
      currentTab = tab;
      
      // Update tab buttons
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      event.target.classList.add('active');
      
      // Update tab content
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(tab + '-tab').classList.add('active');
      
      // Generate QR for new tab
      generateQR();
    }
    
    async function generateQR() {
      let data = '';
      let type = currentTab;
      
      if (currentTab === 'url') {
        data = document.getElementById('url-input').value.trim();
      } else if (currentTab === 'text') {
        data = document.getElementById('text-input').value.trim();
      } else if (currentTab === 'contact') {
        const contact = {
          firstName: document.getElementById('contact-firstname').value.trim(),
          lastName: document.getElementById('contact-lastname').value.trim(),
          phone: document.getElementById('contact-phone').value.trim(),
          email: document.getElementById('contact-email').value.trim(),
          organization: document.getElementById('contact-org').value.trim(),
          url: document.getElementById('contact-url').value.trim()
        };
        
        if (contact.firstName || contact.lastName || contact.phone || contact.email) {
          data = JSON.stringify(contact);
        }
      }
      
      if (!data) {
        document.getElementById('qr-container').innerHTML = \`
          <div class="qr-placeholder">
            <p style="font-size: 3rem; margin-bottom: 10px;">🔳</p>
            <p>Fill in the form to generate your QR code</p>
          </div>
        \`;
        document.getElementById('qr-actions').style.display = 'none';
        return;
      }
      
      try {
        const response = await fetch('/api/generate-qr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data, type })
        });
        
        const result = await response.json();
        
        if (result.success) {
          currentQRData = result.data;
          currentQRImage = result.qrCode;
          
          document.getElementById('qr-container').innerHTML = \`
            <img src="\${result.qrCode}" alt="QR Code" class="qr-image">
          \`;
          
          document.getElementById('qr-data').textContent = result.data;
          document.getElementById('qr-actions').style.display = 'block';
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    }
    
    function downloadQR() {
      if (currentQRImage) {
        const link = document.createElement('a');
        link.download = \`qr-code-\${currentTab}.png\`;
        link.href = currentQRImage;
        link.click();
      }
    }
    
    function copyData() {
      if (currentQRData) {
        navigator.clipboard.writeText(currentQRData).then(() => {
          const btn = event.target;
          const original = btn.textContent;
          btn.textContent = '✓ Copied!';
          setTimeout(() => btn.textContent = original, 2000);
        });
      }
    }
    
    function clearForm() {
      document.getElementById('url-input').value = '';
      document.getElementById('text-input').value = '';
      document.getElementById('contact-firstname').value = '';
      document.getElementById('contact-lastname').value = '';
      document.getElementById('contact-phone').value = '';
      document.getElementById('contact-email').value = '';
      document.getElementById('contact-org').value = '';
      document.getElementById('contact-url').value = '';
      generateQR();
    }
    
    // Add event listeners
    document.getElementById('url-input').addEventListener('input', generateQR);
    document.getElementById('text-input').addEventListener('input', generateQR);
    ['firstname', 'lastname', 'phone', 'email', 'org', 'url'].forEach(field => {
      document.getElementById('contact-' + field).addEventListener('input', generateQR);
    });
  </script>
</body>
</html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 QR Code Generator running on http://localhost:' + PORT);
  console.log('📝 Install dependencies: npm install express qrcode');
});