import { NextResponse } from "next/server";
import crypto from "crypto";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

if (!publicKey || !privateKey || !urlEndpoint) {
  console.error("Missing ImageKit configuration:", {
    hasPublicKey: !!publicKey,
    hasPrivateKey: !!privateKey,
    hasUrlEndpoint: !!urlEndpoint,
  });
}

export async function GET() {
  try {
    // Generate timestamps
    const expire = (Math.floor(Date.now() / 1000) + 30 * 60).toString();
    const token = crypto.randomUUID();

    // Generate signature using HMAC SHA1
    const signatureString = token + expire;
    const signature = crypto
      .createHmac("sha1", privateKey || "")
      .update(signatureString)
      .digest("hex");

    // Return authentication parameters
    const response = {
      token: token,
      expire: expire,
      signature: signature,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("ImageKit authentication error:", error);
    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
