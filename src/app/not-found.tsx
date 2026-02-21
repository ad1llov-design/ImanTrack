export default function NotFound() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>404</h1>
      <p style={{ color: "#666" }}>Страница не найдена</p>
      <a href="/" style={{ color: "#369970", textDecoration: "underline" }}>
        Вернуться на главную
      </a>
    </div>
  );
}
