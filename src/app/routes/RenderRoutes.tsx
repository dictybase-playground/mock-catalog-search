import { lazy, Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import Loader from "common/components/Loader"
import useGoogleAnalytics from "common/hooks/useGoogleAnalytics"

const Homepage = lazy(
  () => import(/* webpackChunkName: "Homepage" */ "features/Home/Homepage"),
)

// strain routes
const StrainCatalogWrapper = lazy(
  () =>
    import(
      /* webpackChunkName: "StrainCatalogWrapper" */ "features/Stocks/Catalogs/common/CatalogWrapper"
    ),
)
const StrainDetailsContainer = lazy(
  () =>
    import(
      /* webpackChunkName: "StrainDetailsContainer" */ "features/Stocks/Details/Strains/StrainDetailsContainer"
    ),
)

// custom 404 route
const PageNotFound = lazy(
  () =>
    import(
      /* webpackChunkName: "PageNotFound" */ "features/Errors/PageNotFound"
    ),
)

const RenderRoutes = () => {
  useGoogleAnalytics()

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" component={Homepage} />
        {/* strain routes */}
        <Route
          exact
          path="/strains"
          render={(props) => (
            <StrainCatalogWrapper {...props} stockType="strain" />
          )}
        />
        <Route exact path="/strains/:id" component={StrainDetailsContainer} />
        <Route exact path="*" component={PageNotFound} />
      </Switch>
    </Suspense>
  )
}

export default RenderRoutes
