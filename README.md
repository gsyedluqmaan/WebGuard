# Web Security Analyzer

A full-stack web security analysis platform that evaluates websites for **security vulnerabilities** and **user safety risks**. The system allows developers, security enthusiasts, and general users to analyze a website and understand potential threats before interacting with it.

The platform provides two main capabilities:

1. **Website Vulnerability Scanner** – identifies security weaknesses in websites.
2. **User Safety Analyzer** – determines whether a website may be dangerous for visitors.

It also includes a **browser extension** that can analyze the currently opened website directly from the browser.

---

# Overview

Web Security Analyzer is designed to help users understand potential risks associated with websites. It performs automated checks to identify:

- security misconfigurations
- common web vulnerabilities
- phishing indicators
- unsafe connections
- suspicious scripts
- potentially dangerous downloads

The system analyzes a given website URL and produces a **risk score** along with categorized findings.

---

# System Architecture

The platform consists of three components:

### Backend API
A Node.js based API that performs all website analysis and scanning operations.

Responsibilities include:
- crawling website pages
- analyzing HTTP responses
- detecting vulnerabilities
- identifying user safety risks
- calculating risk scores

### Web Frontend
A Next.js interface where users can input a website URL and choose between:

- vulnerability scanning
- user safety analysis

Results are displayed in an easy-to-understand format including safety classification and detected issues.

### Browser Extension
The browser extension allows users to analyze the **currently opened website directly from the browser**.

Workflow:

1. User visits a website
2. Extension reads the current tab URL
3. User clicks **Check Safety** or **Check Vulnerability**
4. Extension sends the URL to the backend
5. Backend performs analysis
6. Results are displayed in the extension popup

---

# Features

- Website vulnerability detection
- User safety analysis
- Security header inspection
- Suspicious script detection
- Dangerous download detection
- Phishing indicator detection
- Risk scoring system
- Browser extension integration
- Real-time analysis through API

---

# Scanning Modes

The system operates in two primary modes.

## 1. Vulnerability Scanning

This mode focuses on identifying **security weaknesses in a website** that attackers could exploit.

It analyzes multiple aspects of the target website including configuration issues and common vulnerabilities.

### Security Header Analysis

The scanner checks for important HTTP security headers that protect websites from attacks.

Examples include headers designed to prevent:
- cross-site scripting
- clickjacking
- man-in-the-middle attacks

If important headers are missing, the system flags them as vulnerabilities.

---

### Open Directory Detection

The scanner attempts to access commonly exposed directories that may reveal sensitive files.

Examples of such directories include areas used for:
- file uploads
- backups
- logs
- administrative content

If directory contents are accessible publicly, it indicates a potential security misconfiguration.

---

### Exposed API Endpoints

The system checks for publicly accessible API endpoints that may expose internal functionality or data.

Commonly discovered endpoints include:
- application APIs
- development documentation interfaces
- testing endpoints

Publicly accessible APIs without proper security controls can lead to data exposure.

---

### Cross-Site Scripting (XSS)

The scanner checks for reflected script injection vulnerabilities.

These vulnerabilities allow attackers to inject malicious scripts into web pages which may execute in a visitor's browser.

Potential impacts include:
- session hijacking
- credential theft
- malicious redirections

---

### SQL Injection Indicators

The system analyzes application responses for signs that database queries can be manipulated through user input.

Indicators include database error messages and abnormal server responses that suggest unsafe query handling.

Successful SQL injection vulnerabilities could allow attackers to:
- access sensitive data
- modify database contents
- bypass authentication systems

---

### Suspicious JavaScript Detection

The scanner evaluates website scripts for patterns commonly associated with malicious or obfuscated code.

Examples include:
- dynamically executed scripts
- encoded JavaScript
- potentially unsafe script execution methods

These patterns may indicate malicious code or unsafe scripting practices.

---

### Form Detection

The system identifies forms present on the website.

Forms are important entry points where vulnerabilities may exist, particularly those involving user input fields.

Forms may potentially be vulnerable to:
- injection attacks
- credential harvesting
- malicious input manipulation

---

# User Safety Analysis

The second scanning mode focuses on determining **whether a website is safe for normal users to interact with**.

This is the same functionality used by the browser extension.

---

### HTTPS Security Check

The analyzer verifies whether the website uses a secure HTTPS connection.

Websites using unsecured HTTP connections may expose user data to interception attacks.

Risks include:
- data leakage
- session interception
- man-in-the-middle attacks

---

### Suspicious Domain Detection

The system analyzes domain names for patterns commonly used in phishing attacks.

Phishing domains often attempt to mimic legitimate services using misleading keywords or structures.

Indicators may include:
- login-related keywords
- security-related wording
- domain patterns often used by phishing sites

---

### Dangerous Download Detection

The analyzer scans website content for links that may lead to executable or potentially harmful files.

Certain file types may indicate malware distribution.

Examples include executable programs, scripts, or packaged applications that may contain malicious code.

---

### Suspicious Script Analysis

The system analyzes scripts loaded by the website for signs of obfuscation or potentially unsafe behavior.

These patterns may indicate:
- malware distribution
- browser exploitation
- cryptomining scripts
- malicious advertising networks

---

### Tracking Script Detection

The analyzer also identifies known tracking scripts that collect visitor data.

While not necessarily malicious, excessive tracking scripts may pose privacy concerns.

---

# Risk Scoring System

After all checks are completed, the system assigns a **risk score** based on the detected issues.

Each issue is classified according to severity levels:

- High severity
- Medium severity
- Low severity

The score determines the overall safety classification.

### Safety Classification

| Score Range | Classification |
|-------------|---------------|
| 80 – 100 | SAFE |
| 50 – 79 | RISKY |
| 0 – 49 | DANGEROUS |

This classification provides a quick understanding of the website's potential risk.

---

# Browser Extension

The browser extension allows users to analyze websites directly from their browser.

### Extension Capabilities

- Automatically retrieves the current tab URL
- Sends the URL to the security analysis backend
- Displays safety results inside the popup interface
- Allows both vulnerability scanning and safety checks

This allows users to quickly verify a site's safety without manually entering URLs.

---

# Use Cases

Web Security Analyzer can be used for:

### Security Learning
Students and security enthusiasts can analyze websites to understand common vulnerabilities.

### Developer Security Checks
Developers can quickly test websites for misconfigurations and vulnerabilities.

### User Safety Awareness
Users can verify whether websites may pose security risks before interacting with them.

### Browser Protection
The extension provides a quick way to analyze websites directly during browsing.

---

# Limitations

The system performs automated analysis based on observable indicators. It does not replace professional penetration testing tools.

Certain vulnerabilities may require deeper manual analysis or authenticated testing.

Additionally, some websites may block automated scanning or limit responses.

---

# Ethical Use

This tool is intended only for:

- educational purposes
- security research
- testing websites you own
- testing websites where you have explicit permission

Users should **not perform unauthorized scans on production websites**.

---

# Future Improvements

Potential future enhancements include:

- phishing domain similarity detection
- redirect chain analysis
- malicious iframe detection
- cookie security analysis
- machine learning based phishing detection
- automated browser extension scanning
- security dashboard visualization
- scan history tracking
- distributed scanning architecture

---

# Conclusion

Web Security Analyzer provides a practical way to evaluate websites for both **security vulnerabilities** and **user safety risks**.

By combining a backend scanning engine, a modern web interface, and a browser extension, the platform enables users to quickly understand the security posture of websites and identify potential threats.