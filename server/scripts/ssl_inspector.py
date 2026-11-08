#!/usr/bin/env python3
"""
TrustMatrix AI Nexus - Python SSL & X.509 OpenSSL Inspector
Implements Section 8: Web Security (Python SSL libraries, OpenSSL, DNS analysis)
"""

import sys
import json
import socket
import ssl
from datetime import datetime

def inspect_ssl_target(hostname, port=443):
    result = {
        "hostname": hostname,
        "port": port,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "tlsHandshakeSuccessful": False,
        "cipher": None,
        "protocolVersion": None,
        "peerCertificate": None,
        "warnings": []
    }

    context = ssl.create_default_context()
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE  # For passive inspection of untrusted/self-signed certs

    try:
        with socket.create_connection((hostname, port), timeout=5.0) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                result["tlsHandshakeSuccessful"] = True
                result["cipher"] = ssock.cipher()
                result["protocolVersion"] = ssock.version()
                
                # Fetch raw DER certificate
                der_cert = ssock.getpeercert(binary_form=True)
                if der_cert:
                    # In python standard library, getpeercert(False) returns formatted dict
                    cert_dict = ssock.getpeercert() or {}
                    result["peerCertificate"] = {
                        "subject": cert_dict.get("subject", []),
                        "issuer": cert_dict.get("issuer", []),
                        "version": cert_dict.get("version"),
                        "notBefore": cert_dict.get("notBefore"),
                        "notAfter": cert_dict.get("notAfter"),
                        "serialNumber": cert_dict.get("serialNumber"),
                        "derLengthBytes": len(der_cert)
                    }

                # Evaluate security properties
                if result["protocolVersion"] in ["TLSv1", "TLSv1.1", "SSLv2", "SSLv3"]:
                    result["warnings"].append(f"Legacy insecure protocol negotiated: {result['protocolVersion']}")
                
                if result["cipher"] and "RC4" in result["cipher"][0] or "MD5" in (result["cipher"] or [""])[0]:
                    result["warnings"].append(f"Weak cipher suite detected: {result['cipher'][0]}")

    except Exception as e:
        result["error"] = str(e)
        result["warnings"].append(f"TLS connection failure: {str(e)}")

    return result

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "github.com"
    clean_host = target.replace("https://", "").replace("http://", "").split("/")[0].split(":")[0]
    inspection = inspect_ssl_target(clean_host)
    print(json.dumps(inspection, indent=2))
