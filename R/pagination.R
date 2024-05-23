#' Paginate a data frame
#'
#' Breaks a data.frame into chunks. Adds a new column `pageIndex` to the data.
#'  Returns new data and total number of pages.
#'
#' @noRd
paginate <- function(data, page_size = NULL) {

  n_rows <- nrow(data)

  if (is.null(page_size)) {
    page_size <- floor(n_rows * 0.1)
  }

  if (page_size < 10) {
    page_size <- 10
  }

  if (page_size > 25) {
    page_size <- 25
  }

  n_pages <- floor(n_rows / page_size)

  page_col <- rep(seq_len(n_pages), each = page_size)

  if (length(page_col) < n_rows) {
    diff <- n_rows - length(page_col)
    leftover_page_col <- rep(n_pages + 1, diff)
    page_col <- c(page_col, leftover_page_col)
    n_pages <- n_pages + 1
  }

  data$pageIndex <- page_col

  data

}


#' Get cursor information
#'
#' Get cursor information for infinite scroll. Returns a list with the previous
#'  cursor, next cursor, and the row indices for the current cursor.
#'
#' @noRd
cursify <- function(cursor, page_size, n_rows) {

  previousCursor <- cursor - 1
  if (previousCursor < 1) previousCursor <- NULL
  nextCursor <- cursor + 1
  if ((nextCursor * page_size) > n_rows) nextCursor <- NULL

  if (is.null(previousCursor)) {
    rowStart <- 1
    rowEnd <- cursor * page_size
  }
  if (is.null(nextCursor)) {
    rowStart <- (previousCursor * page_size) + 1
    rowEnd <- n_rows
  }
  if (!is.null(previousCursor) && !is.null(nextCursor)) {
    rowStart <- (previousCursor * page_size) + 1
    rowEnd <- (nextCursor * page_size) - page_size
  }

  list(
    previousCursor = previousCursor,
    nextCursor = nextCursor,
    rowIndices = rowStart:rowEnd
  )
}
