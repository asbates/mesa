
#' Default SSR options
#'
#' Default options for server-side rendering. These are the default values used
#'  in [mesa]. To modify an option, supply a named list with the option you would
#'  like to change. You only need to supply the values to modify.
#'
#'  - `useSSR` Should server-side rendering be used? If `FALSE`, the remaining
#'      options are ignored.
#'  - `usePagination` Should server-side rendering be done via pagination?
#'  - `useInfiniteScroll` Should server-side rendering be done via infinite scroll?
#'
#' If `useSSR` is `FALSE`, the remaining arguments are ignored. If both
#'  `usePagination` and `useInfiniteScroll` are `TRUE`, infinite scroll will be
#'  used.
#'
#' @export
mesaSSROptions <- list(
  useSSR = TRUE,
  usePagination = TRUE,
  useInfiniteScroll = FALSE
)


