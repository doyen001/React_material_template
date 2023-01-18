const avatar = (theme) => ({
  ".avatar": {
    color: theme("colors.white"),
    display: "inline-flex",
    height: theme("height.10"),
    width: theme("width.10"),
    transition: "all .2s ease-in-out",
  
    "img": {
      height: theme("height.full"),
      width: theme("width.full"),
      borderRadius: theme("borderRadius.xl"),
    },
  
    "&.avatar-circular img": {
      borderRadius: theme("borderRadius.full")
    },
  
    "&.avatar-xs": {
      height: theme("height.5"),
      width: theme("width.5"),
    },
    "&.avatar-sm": {
      height: theme("height.7"),
      width: theme("width.7"),
    },
    "&.avatar-md": {
      height: theme("height.10"),
      width: theme("width.10"),
    },
    "&.avatar-lg": {
      height: theme("height.12"),
      width: theme("width.12"),
    },
    "&.avatar-xl": {
      height: theme("height.16"),
      width: theme("width.16"),
    }, 
    "&.avatar-xxl": {
      height: theme("height.20"),
      width: theme("width.20"),
    }
  },

  ".avatar-group": {
    ".avatar": {
      position: "relative",
      zIndex: theme("zIndex.20"),
      border: theme("spacing.[0.5]") + " solid " + theme("colors.white"),
      borderRadius: theme("borderRadius.full"),

      "&:hover": {
        zIndex: theme("zIndex.30")
      },

      "+ .avatar": {
        marginLeft: "-" + theme("spacing.3")
      }
    }
  }
});

module.exports.avatar = avatar;
