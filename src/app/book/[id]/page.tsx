"use client";
import { Book } from "@/types/book";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          const _book: Book = data["book"];
          setBook(_book);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id !== undefined) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <div className="loader"></div>
        <p>กำลังโหลดข้อมูล...</p>
        <style jsx>{`
          .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (!book) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "red" }}>❌ ไม่พบข้อมูลหนังสือ</h2>
        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            background: "#3498db",
            color: "white",
            cursor: "pointer",
          }}
        >
          กลับไปหน้ารายการ
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "#fff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>{book.title}</h1>
        <p style={{ fontStyle: "italic", marginBottom: "20px" }}>
          ✍️ ผู้แต่ง: {book.author}
        </p>
        <hr style={{ margin: "20px 0" }} />
        <p style={{ lineHeight: "1.8", marginBottom: "20px" }}>
          {book.description}
        </p>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#2c3e50",
            marginBottom: "30px",
          }}
        >
          💰 ราคา: {book.price} บาท
        </p>
        <div style={{ textAlign: "right" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              background: "#3498db",
              color: "white",
              cursor: "pointer",
            }}
          >
            ⬅ กลับไปหน้ารายการ
          </button>
        </div>
      </div>
    </div>
  );
}
