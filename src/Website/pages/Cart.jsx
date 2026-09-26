import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  GlobalStyles,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import { toast } from "sonner";
import {
  addToCart,
  clearCart,
  formatPrice,
  getCart,
  removeFromCart,
} from "@/lib/cart";
import { auth } from "@/firebase";
import knoraLogo from "@/assets/knora-logo-transparent.png";

const benefits = [
  { icon: SchoolRoundedIcon, label: "Expert-led learning" },
  { icon: WorkspacePremiumRoundedIcon, label: "Verified certificate" },
  { icon: VerifiedUserRoundedIcon, label: "Secure enrollment" },
];

export default function Cart() {
  const [items, setItems] = useState([]);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [removingId, setRemovingId] = useState("");
  const [clearOpen, setClearOpen] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0,
  );
  const originalTotal = items.reduce(
    (sum, item) => sum + Number(item.originalPrice || item.price || 0),
    0,
  );
  const savings = Math.max(originalTotal - subtotal, 0);

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

  const remove = async (item) => {
    setRemovingId(item.id);
    try {
      await removeFromCart(item.id);
      toast.success(`${item.name} removed`, {
        action: {
          label: "Undo",
          onClick: async () => {
            try {
              await addToCart(item);
            } finally {
              setItems(getCart());
            }
          },
        },
      });
    } catch {
      toast.error("Could not update your cart. Please try again.");
    } finally {
      setItems(getCart());
      setRemovingId("");
    }
  };

  const removeAll = async () => {
    try {
      await clearCart();
      setItems([]);
      setClearOpen(false);
      toast.success("Cart cleared");
    } catch {
      setItems(getCart());
      toast.error("Could not clear the synced cart. Please try again.");
    }
  };

  if (checkingAuth) return <Box className="commerce-page" />;

  return (
    <Box className="commerce-page">
      <GlobalStyles styles={commerceStyles} />
      <Box className="commerce-glow commerce-glow-one" />
      <Box className="commerce-glow commerce-glow-two" />

      <Box className="commerce-header">
        <a href="/" className="commerce-brand" aria-label="Knora home">
          <img src={knoraLogo} alt="Knora" />
        </a>
        <Box className="commerce-steps" aria-label="Checkout progress">
          <span className="is-current">Cart</span>
          <ArrowForwardRoundedIcon />
          <span>Details</span>
          <ArrowForwardRoundedIcon />
          <span>Payment</span>
        </Box>
        <Box className="commerce-secure-label">
          <LockRoundedIcon /> Secure checkout
        </Box>
      </Box>

      <Box className="commerce-shell cart-shell">
        <Button
          href="/courses"
          className="commerce-back"
          startIcon={<ArrowBackRoundedIcon />}
        >
          Continue exploring
        </Button>

        <Box className="commerce-heading cart-heading">
          <Chip
            icon={<ShoppingBagRoundedIcon />}
            label={`${items.length} course${items.length === 1 ? "" : "s"}`}
          />
          <Typography component="h1">Build your next advantage.</Typography>
          <Typography>
            Your selected programs are ready. Review the details and complete
            your secure enrollment when you are happy.
          </Typography>
        </Box>

        {items.length ? (
          <>
            <Box className="cart-section-bar">
              <Box>
                <Typography component="h2">Your courses</Typography>
                <Typography>
                  Lifetime learning access after enrollment
                </Typography>
              </Box>
              <Button
                color="error"
                startIcon={<DeleteOutlineRoundedIcon />}
                onClick={() => setClearOpen(true)}
              >
                Clear cart
              </Button>
            </Box>

            <Box className="cart-layout">
              <Stack spacing={2.2}>
                {items.map((item) => {
                  const discount = item.originalPrice
                    ? Math.round(
                        ((item.originalPrice - item.price) /
                          item.originalPrice) *
                          100,
                      )
                    : 0;
                  return (
                    <Box className="cart-item" key={item.id}>
                      <a
                        href={`/course/${item.id}/overview`}
                        className="cart-image-wrap"
                        aria-label={`View ${item.name}`}
                      >
                        <Box component="img" src={item.image} alt={item.name} />
                        {discount > 0 && (
                          <span className="cart-discount">{discount}% off</span>
                        )}
                      </a>

                      <Stack className="cart-item-copy">
                        <Typography className="cart-eyebrow">
                          {item.category || "Professional course"}
                        </Typography>
                        <Typography
                          component="a"
                          href={`/course/${item.id}/overview`}
                          className="cart-course-title"
                        >
                          {item.name}
                        </Typography>
                        <Typography className="cart-description">
                          {item.duration} · {item.mode} · {item.level}
                        </Typography>
                        <Stack direction="row" className="cart-course-meta">
                          {item.rating && (
                            <span className="cart-rating">
                              <StarRoundedIcon /> {item.rating}
                              <small>course rating</small>
                            </span>
                          )}
                          {item.hours && (
                            <span>
                              <AccessTimeRoundedIcon /> {item.hours} hours
                            </span>
                          )}
                          <span>
                            <CheckCircleRoundedIcon /> Certificate included
                          </span>
                        </Stack>
                      </Stack>

                      <Box className="cart-item-actions">
                        <Box className="cart-price-block">
                          <Typography className="cart-price">
                            {formatPrice(item.price)}
                          </Typography>
                          {item.originalPrice > item.price && (
                            <Typography
                              component="del"
                              className="cart-original-price"
                            >
                              {formatPrice(item.originalPrice)}
                            </Typography>
                          )}
                        </Box>
                        <IconButton
                          aria-label={`Remove ${item.name}`}
                          className="cart-remove-icon"
                          disabled={removingId === item.id}
                          onClick={() => remove(item)}
                        >
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  );
                })}

                <Box className="cart-trust-row">
                  {benefits.map(({ icon: Icon, label }) => (
                    <Box key={label}>
                      <Icon />
                      <span>{label}</span>
                    </Box>
                  ))}
                </Box>
              </Stack>

              <Box className="cart-summary">
                <Box className="summary-top">
                  <Typography component="h2">Order summary</Typography>
                  <Chip
                    label={`${items.length} item${items.length === 1 ? "" : "s"}`}
                  />
                </Box>
                <Stack className="cart-summary-lines">
                  <Stack direction="row" justifyContent="space-between">
                    <span>Original price</span>
                    <strong>{formatPrice(originalTotal)}</strong>
                  </Stack>
                  {savings > 0 && (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      className="summary-saving"
                    >
                      <span>Course discount</span>
                      <strong>-{formatPrice(savings)}</strong>
                    </Stack>
                  )}
                  <Stack direction="row" justifyContent="space-between">
                    <span>Taxes</span>
                    <strong>Included</strong>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  className="cart-total"
                >
                  <Box>
                    <span>Total</span>
                    <small>One-time payment</small>
                  </Box>
                  <strong>{formatPrice(subtotal)}</strong>
                </Stack>
                {savings > 0 && (
                  <Box className="cart-savings-banner">
                    <CheckCircleRoundedIcon /> You save {formatPrice(savings)}{" "}
                    on this order
                  </Box>
                )}
                <Button
                  className="commerce-primary"
                  href="/checkout"
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  Continue to checkout
                </Button>
                <Typography className="secure-note">
                  <LockRoundedIcon /> Encrypted checkout powered by Stripe
                </Typography>
                <Box className="summary-support">
                  <VerifiedUserRoundedIcon />
                  <div>
                    <strong>Buy with confidence</strong>
                    <span>Secure payment and enrollment support included.</span>
                  </div>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box className="cart-empty">
            <Box className="cart-empty-icon">
              <ShoppingBagRoundedIcon />
            </Box>
            <Chip label="Your learning journey starts here" />
            <Typography component="h2">Your cart is empty</Typography>
            <Typography>
              Explore expert-led programs, compare your options, and add the
              right course for your next career goal.
            </Typography>
            <Button
              href="/courses"
              className="commerce-primary"
              endIcon={<ArrowForwardRoundedIcon />}
            >
              Explore courses
            </Button>
          </Box>
        )}
      </Box>

      <Dialog
        open={clearOpen}
        onClose={() => setClearOpen(false)}
        PaperProps={{ className: "cart-dialog" }}
      >
        <DialogTitle>Clear your cart?</DialogTitle>
        <DialogContent>
          This will remove all selected courses. You can add them again later.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearOpen(false)}>Keep courses</Button>
          <Button color="error" variant="contained" onClick={removeAll}>
            Clear cart
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// Shared with checkout so the commerce journey stays visually consistent.
// eslint-disable-next-line react-refresh/only-export-components
export const commerceStyles = {
  ".commerce-page": {
    background:
      "radial-gradient(circle at 100% 0%,rgba(35,116,255,.10),transparent 32%),#f4f7fb",
    color: "#101828",
    fontFamily: "var(--font-sans)",
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",
  },
  ".commerce-header": {
    alignItems: "center",
    background: "rgba(255,255,255,.82)",
    borderBottom: "1px solid rgba(213,222,235,.85)",
    backdropFilter: "blur(18px)",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    minHeight: 76,
    padding: "10px clamp(22px,4vw,64px)",
    position: "relative",
    zIndex: 5,
  },
  ".commerce-brand": { display: "inline-flex", width: "fit-content" },
  ".commerce-brand img": { height: 48, objectFit: "contain", width: 132 },
  ".commerce-steps": {
    alignItems: "center",
    color: "#98a2b3",
    display: "flex",
    fontSize: 13,
    fontWeight: 700,
    gap: 10,
  },
  ".commerce-steps svg": { fontSize: 15 },
  ".commerce-steps .is-current": { color: "#075ee4" },
  ".commerce-secure-label": {
    alignItems: "center",
    color: "#475467",
    display: "flex",
    fontSize: 13,
    fontWeight: 650,
    gap: 7,
    justifySelf: "end",
  },
  ".commerce-secure-label svg": { color: "#0ca678", fontSize: 18 },
  ".commerce-shell": {
    margin: "0 auto",
    maxWidth: "1440px",
    minHeight: "calc(100vh - 76px)",
    padding: "clamp(28px,4vw,58px) clamp(20px,4vw,64px) 72px",
    position: "relative",
    zIndex: 2,
  },
  ".commerce-glow": {
    borderRadius: "50%",
    filter: "blur(110px)",
    opacity: 0.1,
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
    background: "#42b6ff",
    bottom: -240,
    height: 480,
    left: -200,
    width: 480,
  },
  ".commerce-back.MuiButton-root": {
    color: "#344054",
    fontWeight: 700,
    paddingLeft: 0,
    textTransform: "none",
  },
  ".commerce-heading": { margin: "40px 0 36px", maxWidth: 820 },
  ".commerce-heading .MuiChip-root": {
    background: "#e8f1ff",
    color: "#075ee4",
    fontWeight: 750,
  },
  ".commerce-heading h1": {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(42px,5.3vw,76px)",
    fontWeight: 800,
    letterSpacing: "-.045em",
    lineHeight: 0.98,
    marginTop: 18,
  },
  ".commerce-heading > p": {
    color: "#667085",
    fontSize: "clamp(15px,1.3vw,18px)",
    lineHeight: 1.65,
    marginTop: 18,
    maxWidth: 680,
  },
  ".cart-section-bar": {
    alignItems: "flex-end",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  ".cart-section-bar h2": { fontSize: 21, fontWeight: 800 },
  ".cart-section-bar p": { color: "#667085", fontSize: 13, marginTop: 3 },
  ".cart-section-bar .MuiButton-root": {
    fontWeight: 700,
    textTransform: "none",
  },
  ".cart-layout": {
    alignItems: "start",
    display: "grid",
    gap: 28,
    gridTemplateColumns: "minmax(0,1fr) minmax(330px,390px)",
  },
  ".cart-item, .cart-summary, .cart-empty, .cart-trust-row": {
    background: "rgba(255,255,255,.95)",
    border: "1px solid #dfe7f2",
    borderRadius: 22,
    boxShadow: "0 18px 50px rgba(32,55,91,.07)",
  },
  ".cart-item": {
    alignItems: "center",
    display: "grid",
    gap: 22,
    gridTemplateColumns: "190px minmax(0,1fr) auto",
    overflow: "hidden",
    padding: 14,
    transition: "transform .2s ease,box-shadow .2s ease",
  },
  ".cart-item:hover": {
    boxShadow: "0 22px 56px rgba(32,55,91,.11)",
    transform: "translateY(-2px)",
  },
  ".cart-image-wrap": { display: "block", position: "relative" },
  ".cart-image-wrap img": {
    borderRadius: 15,
    display: "block",
    height: 134,
    objectFit: "cover",
    width: "100%",
  },
  ".cart-discount": {
    background: "#0b9f6e",
    borderRadius: 999,
    bottom: 10,
    color: "#fff",
    fontSize: 11,
    fontWeight: 800,
    left: 10,
    padding: "5px 9px",
    position: "absolute",
  },
  ".cart-item-copy": { gap: "5px !important", minWidth: 0 },
  ".cart-eyebrow": {
    color: "#075ee4",
    fontSize: "11px !important",
    fontWeight: "800 !important",
    letterSpacing: ".1em !important",
    textTransform: "uppercase",
  },
  ".cart-course-title": {
    color: "#101828",
    fontFamily: "var(--font-display)",
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1.2,
    textDecoration: "none",
  },
  ".cart-description": { color: "#667085", fontSize: "13px !important" },
  ".cart-course-meta": {
    color: "#5c6b80",
    flexWrap: "wrap",
    gap: "7px 14px !important",
    marginTop: "8px !important",
  },
  ".cart-course-meta span": {
    alignItems: "center",
    display: "inline-flex",
    fontSize: 12,
    gap: 5,
  },
  ".cart-course-meta small": { color: "#98a2b3", fontSize: 10 },
  ".cart-course-meta svg": { color: "#2477ef", fontSize: 16 },
  ".cart-course-meta .cart-rating svg": { color: "#f5a524" },
  ".cart-item-actions": {
    alignItems: "flex-end",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "8px 4px 6px 0",
  },
  ".cart-price-block": { textAlign: "right" },
  ".cart-price": { fontSize: "21px !important", fontWeight: "850 !important" },
  ".cart-original-price": { color: "#98a2b3", fontSize: "12px !important" },
  ".cart-remove-icon.MuiIconButton-root": {
    border: "1px solid #e5eaf1",
    color: "#7d899a",
    height: 36,
    width: 36,
  },
  ".cart-remove-icon.MuiIconButton-root:hover": {
    background: "#fff1f2",
    borderColor: "#ffd4d8",
    color: "#e83b4f",
  },
  ".cart-trust-row": {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    padding: 18,
  },
  ".cart-trust-row > div": {
    alignItems: "center",
    color: "#475467",
    display: "flex",
    fontSize: 12,
    fontWeight: 700,
    gap: 8,
    justifyContent: "center",
  },
  ".cart-trust-row svg": { color: "#1474ee", fontSize: 20 },
  ".cart-summary": {
    alignSelf: "start",
    padding: 28,
    position: "sticky",
    top: 24,
  },
  ".summary-top": {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  ".summary-top h2": {
    fontFamily: "var(--font-display)",
    fontSize: 23,
    fontWeight: 800,
  },
  ".summary-top .MuiChip-root": {
    background: "#f0f5ff",
    color: "#3767ad",
    fontWeight: 700,
  },
  ".cart-summary-lines": {
    borderBottom: "1px solid #e8edf4",
    borderTop: "1px solid #e8edf4",
    color: "#667085",
    fontSize: 14,
    gap: "13px !important",
    margin: "24px 0",
    padding: "20px 0",
  },
  ".cart-summary-lines strong": { color: "#344054", fontWeight: 700 },
  ".cart-summary-lines .summary-saving, .summary-saving strong": {
    color: "#07865f",
  },
  ".cart-total": { alignItems: "center", marginBottom: 18 },
  ".cart-total > div": { display: "grid", gap: 2 },
  ".cart-total span": { fontSize: 17, fontWeight: 800 },
  ".cart-total small": { color: "#98a2b3", fontSize: 11 },
  ".cart-total strong": { fontSize: 27 },
  ".cart-savings-banner": {
    alignItems: "center",
    background: "#edfbf5",
    borderRadius: 10,
    color: "#087b59",
    display: "flex",
    fontSize: 12,
    fontWeight: 750,
    gap: 7,
    marginBottom: 16,
    padding: "10px 12px",
  },
  ".cart-savings-banner svg": { fontSize: 17 },
  ".commerce-primary.MuiButton-root": {
    background: "linear-gradient(135deg,#0868ee,#0044b8)",
    borderRadius: 13,
    boxShadow: "0 12px 24px rgba(7,94,228,.22)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 800,
    minHeight: 50,
    padding: "13px 20px",
    textTransform: "none",
    width: "100%",
  },
  ".commerce-primary.MuiButton-root:hover": {
    background: "linear-gradient(135deg,#075ed8,#003c9f)",
    boxShadow: "0 14px 28px rgba(7,94,228,.28)",
  },
  ".secure-note": {
    alignItems: "center",
    color: "#667085",
    display: "flex",
    fontSize: "11px !important",
    gap: 6,
    justifyContent: "center",
    marginTop: "13px !important",
  },
  ".secure-note svg": { color: "#0ca678", fontSize: 14 },
  ".summary-support": {
    alignItems: "flex-start",
    borderTop: "1px solid #e8edf4",
    display: "flex",
    gap: 10,
    marginTop: 20,
    paddingTop: 18,
  },
  ".summary-support > svg": { color: "#2677eb", fontSize: 22 },
  ".summary-support div": { display: "grid", gap: 3 },
  ".summary-support strong": { fontSize: 12 },
  ".summary-support span": { color: "#667085", fontSize: 11, lineHeight: 1.45 },
  ".cart-empty": {
    margin: "60px auto 0",
    maxWidth: 680,
    padding: "64px 34px",
    textAlign: "center",
  },
  ".cart-empty-icon": {
    alignItems: "center",
    background: "linear-gradient(135deg,#eaf3ff,#f5f9ff)",
    borderRadius: "50%",
    color: "#116de9",
    display: "flex",
    height: 86,
    justifyContent: "center",
    margin: "0 auto 18px",
    width: 86,
  },
  ".cart-empty-icon svg": { fontSize: 42 },
  ".cart-empty .MuiChip-root": {
    background: "#edf5ff",
    color: "#2268c7",
    fontWeight: 700,
  },
  ".cart-empty h2": {
    fontFamily: "var(--font-display)",
    fontSize: 34,
    fontWeight: 850,
    marginTop: 18,
  },
  ".cart-empty > p": {
    color: "#667085",
    lineHeight: 1.65,
    margin: "10px auto 28px",
    maxWidth: 500,
  },
  ".cart-empty .commerce-primary": { maxWidth: 250 },
  ".cart-dialog.MuiPaper-root": { borderRadius: 18, padding: 8 },
  ".cart-dialog .MuiDialogTitle-root": { fontWeight: 800 },
  ".cart-dialog .MuiDialogContent-root": { color: "#667085" },
  ".cart-dialog .MuiButton-root": { fontWeight: 750, textTransform: "none" },
  "@media(max-width:980px)": {
    ".cart-layout": { gridTemplateColumns: "1fr" },
    ".cart-summary": { position: "static" },
  },
  "@media(max-width:720px)": {
    ".commerce-header": {
      gridTemplateColumns: "1fr auto",
      minHeight: 66,
      padding: "8px 16px",
    },
    ".commerce-brand img": { height: 42, width: 112 },
    ".commerce-steps": { display: "none" },
    ".commerce-secure-label": { fontSize: 11 },
    ".commerce-shell": { padding: "22px 14px 48px" },
    ".commerce-heading": { margin: "30px 0" },
    ".commerce-heading h1": { fontSize: "42px" },
    ".cart-section-bar": { alignItems: "center" },
    ".cart-section-bar p": { display: "none" },
    ".cart-item": {
      alignItems: "start",
      gap: 14,
      gridTemplateColumns: "118px 1fr",
      padding: 11,
    },
    ".cart-image-wrap img": { height: 122 },
    ".cart-course-title": { fontSize: 17 },
    ".cart-description": { fontSize: "11px !important" },
    ".cart-course-meta span": { fontSize: 11 },
    ".cart-course-meta span:last-child": { display: "none" },
    ".cart-item-actions": {
      alignItems: "center",
      borderTop: "1px solid #e9eef5",
      flexDirection: "row",
      gridColumn: "1/-1",
      padding: "10px 2px 1px",
    },
    ".cart-price-block": { alignItems: "baseline", display: "flex", gap: 8 },
    ".cart-price": { fontSize: "18px !important" },
    ".cart-trust-row": { gridTemplateColumns: "1fr", gap: 12 },
    ".cart-trust-row > div": { justifyContent: "flex-start" },
    ".cart-summary": { borderRadius: 18, padding: 22 },
  },
  "@media(max-width:420px)": {
    ".commerce-heading h1": { fontSize: "36px" },
    ".cart-item": { gridTemplateColumns: "104px 1fr" },
    ".cart-image-wrap img": { height: 112 },
    ".cart-course-meta small": { display: "none" },
    ".commerce-secure-label": { gap: 4 },
  },
};
