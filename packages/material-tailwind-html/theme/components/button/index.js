const buttonVariant = (theme, background) => ({
  "background-color": theme(`${background}.500`),
  color: theme("colors.white"),
  boxShadow: `0 4px 6px -1px ${theme(
    `${background}.100`
  )}, 0 2px 4px -2px ${theme(`${background}.100`)}`,

  "&:hover": {
    boxShadow: `0 10px 15px -3px ${theme(
      `${background}.200`
    )}, 0 4px 6px -4px ${theme(`${background}.200`)}`,
  },

  "&:focus, &:active": {
    boxShadow: "0 0 rgba(0, 0, 0, 0)",
    opacity: 0.85,
  },

  "&.button-amber, &.button-yellow, &.button-lime": {
    color: theme("colors.black"),
  },

  "&.button-gradient": {
    backgroundImage: `linear-gradient(195deg, ${theme(
      `${background}.400`
    )}, ${theme(`${background}.600`)})`,

    "&:hover": {
      boxShadow: `0 10px 15px -3px ${theme(
        `${background}.200`
      )}, 0 4px 6px -4px ${theme(`${background}.200`)}`,
      opacity: 1,
    },

    "&:focus:not(:hover)": {
      boxShadow: `0 4px 6px -1px ${theme(
        `${background}.100`
      )}, 0 2px 4px -2px ${theme(`${background}.100`)}`,
      opacity: 1,
    },

    "&:active": {
      boxShadow: `0 10px 15px -3px ${theme(
        `${background}.200`
      )}, 0 4px 6px -4px ${theme(`${background}.200`)}`,
      opacity: 0.85,
    },
  },

  "&.button-outlined": {
    backgroundColor: theme("colors.transparent"),
    border: `1px solid ${theme(`${background}.500`)}`,
    color: theme(`${background}.500`),
    boxShadow: "0 0 rgba(0, 0, 0, 0)",

    "&:focus:not(:hover)": {
      boxShadow: `0 0 0 0.2rem ${theme(`${background}.200`)}`,
    },
  },

  "&.button-text": {
    backgroundColor: theme("colors.transparent"),
    color: theme(`${background}.500`),
    boxShadow: "0 0 rgba(0, 0, 0, 0)",

    "&:hover": {
      backgroundColor: theme(`${background}.50`),
    },

    "&:active": {
      backgroundColor: theme(`${background}.100`),
    },
  },
});

const buttonSize = (y, x, fontSize) => ({
  padding: `${y} ${x}`,
  fontSize: fontSize || "0.75rem",
});

const button = (theme) => ({
  ".button": {
    padding: theme("spacing.[2.5]") + " " + theme("spacing.6"),
    borderRadius: theme("borderRadius.lg"),
    fontWeight: theme("fontWeight.medium"),
    fontSize: theme("fontSize.xs"),
    display: "inline-block",
    lineHeight: "1.667",
    transition: "all .15s ease-in",
    cursor: "pointer",
    letterSpacing: "0",
    backgroundSize: "150%",
    backgroundPositionX: "25%",
    position: "relative",
    overflow: "hidden",
    textTransform: "uppercase",

    "&.button-icon": {
      padding: theme("spacing.[2.5]"),
      lineHeight: "initial",

      i: {
        position: "relative",
        top: "1px",
        fontSize: theme("fontSize.base"),
      },
    },
  },
  ".button-blue-gray": buttonVariant(theme, "colors.blue-gray"),
  ".button-grey": buttonVariant(theme, "colors.grey"),
  ".button-brown": buttonVariant(theme, "colors.brown"),
  ".button-deep-orange": buttonVariant(theme, "colors.deep-orange"),
  ".button-orange": buttonVariant(theme, "colors.orange"),
  ".button-amber": buttonVariant(theme, "colors.amber"),
  ".button-yellow": buttonVariant(theme, "colors.yellow"),
  ".button-lime": buttonVariant(theme, "colors.lime"),
  ".button-light-green": buttonVariant(theme, "colors.light-green"),
  ".button-green": buttonVariant(theme, "colors.green"),
  ".button-teal": buttonVariant(theme, "colors.teal"),
  ".button-cyan": buttonVariant(theme, "colors.cyan"),
  ".button-light-blue": buttonVariant(theme, "colors.light-blue"),
  ".button-blue": buttonVariant(theme, "colors.blue"),
  ".button-indigo": buttonVariant(theme, "colors.indigo"),
  ".button-deep-purple": buttonVariant(theme, "colors.deep-purple"),
  ".button-purple": buttonVariant(theme, "colors.purple"),
  ".button-pink": buttonVariant(theme, "colors.pink"),
  ".button-red": buttonVariant(theme, "colors.red"),
  ".button-secondary": buttonVariant(theme, "colors.secondary"),
  ".button-light": buttonVariant(theme, "colors.light"),
  ".button-dark": buttonVariant(theme, "colors.dark"),
  ".button-sm": buttonSize("0.375rem", "1rem"),
  ".button-lg": buttonSize("0.771rem", "1.75rem", "0.875rem"),
  ".button-block": {
    display: "block",
    width: "100%",
  },
});

module.exports.buttonVariant = buttonVariant;
module.exports.buttonSize = buttonSize;
module.exports.button = button;
