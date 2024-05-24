
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


#' Default style options
#'
#' These are the default values used for the `styleOptions` argument of [mesa].
#' This allows you to add *additional* classes to a table. A `mesa` table comes
#'   with the classes listed below. To add additional classes, provide a
#'   character vector of length 1, wich each class separates by a space.
#'   For example if you wanted to use Bootstrap 5 table styling, you could set
#'   `tableClass = "table table-primary"`. In the output, the `<table>` tag
#'   would have the class `mesa-table table table-primary.`
#'
#' - `<table>`: `mesa-table`
#' - `<thead>`: `mesa-thead`
#' - `<tbody>`: `mesa-tbody`
#' - `<th>`: `mesa-th`
#' - `<tr>`: `mesa-tr`
#' - `<td>`: `mesa-td`
#'
#'
#' @export
mesaStyleOptions = list(
  tableClass = "",
  theadClass = "",
  tbodyClass = "",
  thClass = "",
  trClass = "",
  tdClass = ""
)


