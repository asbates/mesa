mesa <- function(
    columns,
    data,
    ssrOptions = mesaSSROptions
) {
  # need to merge options lists with the defaults
  # so users only need to specify the change, rather than the whole list
  list(
    columns = columns,
    data = data,
    ssrOptions = ssrOptions
  )
}

# note: can put the actual table tag here, if using hydrate = true
# right now, i don't think hydrate = true is actually doing anything
mesaOutput <- function(id) {
  props <- list(id = id)
  htmltools::tags$div(
    id = glue::glue("{id}-container"),
    class = "mesa",
    htmltools::tags$script(
      id = glue::glue("{id}-script"),
      glue::glue(
        "window.mesa.initMesaComponent('Mesa', <jsonlite::toJSON(props, auto_unbox = TRUE)>)",
        .open = "<",
        .close = ">"
      )
    )
  )
}


renderMesa <- function(expr, env = parent.frame(), quoted = FALSE) {
  func <- shiny::exprToFunction(expr, env, quoted)

  function() {
    props <- func()
    id <- shiny::getCurrentOutputInfo()$name
    session <- shiny::getDefaultReactiveDomain()
    props$id <- id

    if (props$ssrOptions$useSSR && props$ssrOptions$usePagination) {

      props <- ssrPaginationRenderHook(
        session,
        id,
        props
      )


    } else if (props$ssrOptions$useSSR && props$ssrOptions$useInfiniteScroll) {
      props <- ssrInfiniteScrollRenderHook(
        session,
        id,
        props
      )
    } else {
      props$data <- jsonlite::toJSON(props$data)
    }

    props
  }
}
