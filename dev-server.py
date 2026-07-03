#!/usr/bin/env python3
"""Tiny no-cache static server for local preview.

ES modules are aggressively cached by browsers, so after editing js/*.js a normal
refresh can serve a stale mix of old + new modules and break the import chain
(symptom: blank grids / "nothing visible"). This server sends Cache-Control:
no-store so every reload fetches fresh files.

Usage:  python3 dev-server.py [port]   (default 8080)
Then open http://127.0.0.1:8080/  — a plain refresh is always up to date.
"""
import http.server
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), NoCacheHandler) as httpd:
        print(f"Serving  http://127.0.0.1:{PORT}/   (no-cache — safe to just refresh)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")
