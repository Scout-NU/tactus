"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CommunityPage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(80.72% 78.16% at 42.05% 34.86%, #05365f 19.71%, #041c39 59.86%, #030213 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 20px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Wave pattern background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.3,
        }}
      >
        <Image
          alt="wave pattern"
          src="/wave-in-landing.svg"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "900px",
          textAlign: "center",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontFamily: '"Stratos", sans-serif',
            fontSize: "clamp(48px, 8vw, 93px)",
            fontWeight: 700,
            lineHeight: "110%",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          JOIN THE <span style={{ color: "#95e2e2" }}>TACTUS</span> COMMUNITY
        </h1>

        <p
          style={{
            color: "#fff",
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "20px",
            lineHeight: "1.6",
            maxWidth: "700px",
            margin: 0,
          }}
        >
          Connect with others who are experiencing music in revolutionary new
          ways. Share your stories, discover events, and be part of a movement
          that&apos;s making music accessible to everyone.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <p
            style={{
              color: "#95e2e2",
              fontFamily: '"Stratos", sans-serif',
              fontSize: "24px",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Coming Soon
          </p>

          <button
            onClick={() => router.push("/")}
            style={{
              color: "white",
              fontFamily: '"Stratos", sans-serif',
              fontSize: "20px",
              fontWeight: 400,
              width: "280px",
              height: "56px",
              borderRadius: "5px",
              background: "#f06532",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(240, 101, 50, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
}

