#' A mesa table
#'
#' Use inside [renderMesa] to render a `mesa` table in your app.
#'
#' @param data The data to render.
#' @param ssrOptions Server-side rendering options. See [mesaSSROptions] for details.
#' @param styleOptions Options for styling the table. See [mesaStyleOptions] for details.
#'
#' @export
mesa <- function(
    data,
    ssrOptions = mesaSSROptions,
    styleOptions = mesaStyleOptions
) {
  # need to merge options lists with the defaults
  # so users only need to specify the change, rather than the whole list
  columns <- make_column_defs(data)
  ssrOptions <- merge_lists(mesaSSROptions, ssrOptions)
  styleOptions <- merge_lists(mesaStyleOptions, styleOptions)

  list(
    columns = columns,
    data = data,
    ssrOptions = ssrOptions,
    styleOptions = styleOptions
  )
}

#' Shiny output function
#'
#' @param id The ID of the table.
#' @export
mesaOutput <- function(id) {
  props <- list(id = id)
  htmltools::tags$div(
    id = glue::glue("{id}-container"),
    class = "mesa",
    mesaDependency(),
    htmltools::tags$script(
      id = glue::glue("{id}-script"),
      glue::glue(
        "window.mesa.initMesaComponent(<jsonlite::toJSON(props, auto_unbox = TRUE)>)",
        .open = "<",
        .close = ">"
      )
    )
  )
}

#' Shiny render function
#'
#' @param expr An expression that generates a [mesa] table.
#' @param env The environment in which to evaluate `expr.`
#' @param quoted Is `expr` a quoted expression?
renderMesa <- function(expr, env = parent.frame(), quoted = FALSE) {
  func <- shiny::exprToFunction(expr, env, quoted)

  function() {
    props <- func()
    id <- shiny::getCurrentOutputInfo()$name
    session <- shiny::getDefaultReactiveDomain()
    props$id <- id

    if (props$ssrOptions$useSSR && props$ssrOptions$useInfiniteScroll) {
      props <- ssrInfiniteScrollRenderHook(
        session,
        id,
        props
      )
    } else if (props$ssrOptions$useSSR && props$ssrOptions$usePagination) {

      props <- ssrPaginationRenderHook(
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
