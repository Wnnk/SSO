import { JSEncrypt } from 'jsencrypt'
 const crypt = new JSEncrypt();
  
const priblic_key = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAybatmftUnyZLWPHzVs1y
78JC7+77s986gsF8beA8SXMZpxgNDaRCtw2NPukrQ4DZep6mD6LoczCy5d+v/ANF
b/+bJw9hASSh/4kHlSnm6W00lUDE6CoxTOWbX+etf8CEDyJXWHv2twY1lochqjZj
19qR8Hfh2XsIddew6P/CuQAvLybEd1y+iTGTLhhL9Qg03H0p3JdNLCGeArU2uUc6
CobFGa/RRgueH+VMtmswNsObSYj4Rl8E+or914i0P7YecJb4yadPcl5GrUdJByzn
U05O+KAmx8BMpP4SxnGjBTN+c2BpWcnMhj9z3Nn/4dUGaSeEw0JaH0C3UKCfIPRD
hQIDAQAB
-----END PUBLIC KEY-----`;
  crypt.setPublicKey(priblic_key);

export default crypt;