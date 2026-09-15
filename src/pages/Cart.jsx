import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  Box,
  Button,
  Chip,
  GlobalStyles,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import { formatPrice, getCart, removeFromCart } from "@/lib/cart";
import { auth } from "@/firebase";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    if (!auth) {
      sessionStorage.setItem("knora-post-login-path", "/cart");
      window.location.href = "/login";
      return undefined;
    }
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        sessionStorage.setItem("knora-post-login-path", "/cart");
        window.location.href = "/login";
        return;
      }
      setItems(getCart());
      setCheckingAuth(false);
    });
  }, []);

  const remove = async (id) => {
    try {
      await removeFromCart(id);
    } finally {
      setItems(getCart());
    }
  };

  if (checkingAuth) return <Box className="commerce-page" />;

  return (
    <Box className="commerce-page">
      <GlobalStyles styles={commerceStyles} />
      <Box className="commerce-glow commerce-glow-one" />
      <Box className="commerce-glow commerce-glow-two" />
      <Box className="commerce-shell">
        <Stack direction="row" className="commerce-topbar">
          <Button href="/courses" startIcon={<ArrowBackRoundedIcon />}>
            Continue exploring
          </Button>
          <Stack direction="row" spacing={1} alignItems="center">
            <LockRoundedIcon sx={{ fontSize: 16 }} />
            <Typography>Secure checkout</Typography>
          </Stack>
        </Stack>

        <Box className="commerce-heading">
          <Chip
            icon={<ShoppingBagRoundedIcon />}
            label={`${items.length} course${items.length === 1 ? "" : "s"}`}
          />
          <Typography component="h1">Your learning cart</Typography>
          <Typography>
            Review your selected programs before continuing to enrollment.
          </Typography>
        </Box>

        {items.length ? (
          <Box className="cart-layout">
            <Stack spacing={2}>
              {items.map((item) => (
                <Box className="cart-item" key={item.id}>
                  <Box component="img" src={item.image} alt={item.name} />
                  <Stack spacing={0.8} className="cart-item-copy">
                    <Typography className="cart-eyebrow">
                      {item.category}
                    </Typography>
                    <Typography component="h2">{item.name}</Typography>
                    <Typography>
                      {item.duration} · {item.mode} · {item.level}
                    </Typography>
                    <Stack direction="row" className="cart-benefits">
                      <span>Live mentoring</span>
                      <span>Project access</span>
                      <span>Certificate</span>
                    </Stack>
                  </Stack>
                  <Stack alignItems="flex-end" justifyContent="space-between">
                    <Typography className="cart-price">
                      {formatPrice(item.price)}
                    </Typography>
                    <Button
                      onClick={() => remove(item.id)}
                      startIcon={<DeleteOutlineRoundedIcon />}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Stack>

            <Box className="cart-summary">
              <Typography component="h2">Order summary</Typography>
              <Stack spacing={1.5} className="cart-summary-lines">
                <Stack direction="row" justifyContent="space-between">
                  <span>Course total</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <span>Taxes</span>
                  <strong>Included</strong>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <span>Enrollment support</span>
                  <strong>Free</strong>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                className="cart-total"
              >
                <span>Total</span>
                <strong>{formatPrice(subtotal)}</strong>
              </Stack>
              <Button
                className="commerce-primary"
                href="/checkout"
                endIcon={<ArrowForwardRoundedIcon />}
              >
                Check out
              </Button>
              <Typography className="secure-note">
                <LockRoundedIcon /> Your enrollment data is securely saved.
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box className="cart-empty">
            <ShoppingBagRoundedIcon />
            <Typography component="h2">
              Your cart is ready for a course
            </Typography>
            <Typography>
              Explore the catalog and choose the program that fits your next
              goal.
            </Typography>
            <Button href="/courses" className="commerce-primary">
              Browse courses
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Shared with the checkout screen so both commerce pages stay visually aligned.
// eslint-disable-next-line react-refresh/only-export-components
export const commerceStyles = {
  ".commerce-page": {
    background: "#f5f8fc",
    color: "#101828",
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",
  },
  ".commerce-shell": {
    margin: "0 auto",
    maxWidth: "1440px",
    minHeight: "100vh",
    padding: "clamp(24px,4vw,64px)",
    position: "relative",
    zIndex: 2,
  },
  ".commerce-glow": {
    borderRadius: "50%",
    filter: "blur(110px)",
    opacity: 0.11,
    position: "absolute",
  },
  ".commerce-glow-one": {
    background: "#075ee4",
    height: 520,
    right: -180,
    top: -180,
    width: 520,
  },
  ".commerce-glow-two": {
    background: "#3f8cff",
    bottom: -240,
    height: 480,
    left: -200,
    width: 480,
  },
  ".commerce-topbar": { alignItems: "center", justifyContent: "space-between" },
  ".commerce-topbar .MuiButton-root": {
    color: "#172033",
    textTransform: "none",
  },
  ".commerce-topbar p": { color: "#667085", fontSize: 13 },
  ".commerce-heading": {
    margin: "clamp(64px,9vh,110px) 0 42px",
    maxWidth: 760,
  },
  ".commerce-heading .MuiChip-root": {
    background: "#e8f1ff",
    color: "#075ee4",
  },
  ".commerce-heading h1": {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(46px,7vw,94px)",
    fontWeight: 800,
    letterSpacing: "-.04em",
    lineHeight: 0.94,
    marginTop: 20,
  },
  ".commerce-heading > p": {
    color: "#667085",
    fontSize: "clamp(15px,1.3vw,19px)",
    marginTop: 20,
  },
  ".cart-layout": {
    display: "grid",
    gap: 28,
    gridTemplateColumns: "minmax(0,1fr) minmax(300px,390px)",
  },
  ".cart-item, .cart-summary, .cart-empty": {
    background: "rgba(255,255,255,.94)",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    backdropFilter: "blur(22px)",
    boxShadow: "0 22px 60px rgba(26,50,92,.08)",
  },
  ".cart-item": {
    alignItems: "center",
    display: "grid",
    gap: 22,
    gridTemplateColumns: "150px minmax(0,1fr) auto",
    padding: 16,
  },
  ".cart-item > img": {
    borderRadius: 16,
    height: 112,
    objectFit: "cover",
    width: 150,
  },
  ".cart-item-copy h2, .cart-summary h2": {
    fontFamily: "var(--font-display)",
    fontSize: 24,
    fontWeight: 750,
  },
  ".cart-item-copy > p": { color: "#667085", fontSize: 13 },
  ".cart-eyebrow": {
    color: "#65a0ff",
    fontSize: "11px !important",
    fontWeight: "800 !important",
    letterSpacing: ".12em",
    textTransform: "uppercase",
  },
  ".cart-price": { fontSize: "19px !important", fontWeight: "800 !important" },
  ".cart-item .MuiButton-root": {
    color: "#667085",
    fontSize: 12,
    textTransform: "none",
  },
  ".cart-summary": {
    alignSelf: "start",
    padding: 28,
    position: "sticky",
    top: 28,
  },
  ".cart-summary-lines": {
    borderBottom: "1px solid #e8edf4",
    borderTop: "1px solid #e8edf4",
    color: "#667085",
    fontSize: 13,
    margin: "24px 0",
    padding: "20px 0",
  },
  ".cart-summary-lines strong": { color: "#344054", fontWeight: 600 },
  ".cart-total": { fontSize: 18, marginBottom: 24 },
  ".cart-total strong": { fontSize: 25 },
  ".commerce-primary.MuiButton-root": {
    background: "linear-gradient(135deg,#0868ee,#0044b8)",
    borderRadius: 14,
    color: "#fff",
    fontWeight: 800,
    padding: "14px 20px",
    textTransform: "none",
    width: "100%",
  },
  ".secure-note": {
    alignItems: "center",
    color: "#667085",
    display: "flex",
    fontSize: "11px !important",
    gap: 6,
    justifyContent: "center",
    marginTop: "14px !important",
  },
  ".secure-note svg": { fontSize: 13 },
  ".cart-empty": {
    margin: "0 auto",
    maxWidth: 650,
    padding: "70px 30px",
    textAlign: "center",
  },
  ".cart-empty > svg": { color: "#4d8fff", fontSize: 68 },
  ".cart-empty h2": {
    fontFamily: "var(--font-display)",
    fontSize: 30,
    fontWeight: 800,
    marginTop: 18,
  },
  ".cart-empty > p": {
    color: "#667085",
    margin: "10px auto 28px",
    maxWidth: 430,
  },
  ".cart-empty .commerce-primary": { maxWidth: 240 },
  ".cart-benefits": {
    flexWrap: "wrap",
    gap: "6px !important",
    marginTop: "5px !important",
  },
  ".cart-benefits span": {
    background: "#f0f5ff",
    border: "1px solid #dbe8ff",
    borderRadius: 999,
    color: "#365b96",
    fontSize: 10,
    fontWeight: 700,
    padding: "4px 8px",
  },
  "@media(max-width:900px)": {
    ".cart-layout": { gridTemplateColumns: "1fr" },
    ".cart-summary": { position: "static" },
  },
  "@media(max-width:620px)": {
    ".commerce-topbar > div": { display: "none" },
    ".cart-item": { gridTemplateColumns: "90px 1fr" },
    ".cart-item > img": { height: 82, width: 90 },
    ".cart-item > div:last-child": {
      alignItems: "flex-start",
      gridColumn: "1/-1",
      width: "100%",
    },
  },
};
