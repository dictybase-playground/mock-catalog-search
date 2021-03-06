import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useCatalogStore from "features/Stocks/Catalogs/context/useCatalogStore"
import useCatalogDispatch from "features/Stocks/Catalogs/context/useCatalogDispatch"
import HelpDialog from "features/Stocks/Catalogs/common/HelpDialog"

const useStyles = makeStyles((theme: Theme) => ({
  helpIcon: {
    color: "#555",
  },
  helpButtonHolder: {
    minHeight: "inherit",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    padding: "15px 0px",
  },
}))

/**
 * AppBarHelp handles the display of the appbar help feature.
 */

const AppBarHelp = () => {
  const {
    state: { helpDialogOpen },
  } = useCatalogStore()
  const { setHelpDialogOpen } = useCatalogDispatch()
  const classes = useStyles()

  const handleClick = () => {
    setHelpDialogOpen(!helpDialogOpen)
  }

  return (
    <Box className={classes.helpButtonHolder}>
      <IconButton
        size="small"
        onClick={handleClick}
        title="Catalog Help"
        className={classes.helpIcon}
        aria-label="Learn more about the stock catalog page">
        <FontAwesomeIcon icon="question-circle" />
      </IconButton>
      <HelpDialog />
    </Box>
  )
}

export default AppBarHelp
