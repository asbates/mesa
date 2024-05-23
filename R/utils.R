make_column_defs <- function(data) {
  lapply(names(data), \(name) {
    list(
      accessorKey = name
    )
  })
}



mesaDependency <- function() {
  htmltools::htmlDependency(
    name = "mesa",
    version = "0.0.1",
    src = system.file(package = "mesa"),
    script = "mesa.js",
    stylesheet = "mesa.css"
  )
}



#' Merge 2 lists
#'
#' Merge 2 lists as follows. Both x and y must be named. If there is a value in
#' y that has the same name as a value in x, the value from y will be used. This
#' is like `{...obj1, ...obj2}` in JavaScript.
#'
#' @param x The list to replace values in.
#' @param y The list with the replacement values.
#'
#' @noRd
merge_lists <- function(x, y) {
  out <- x
  for (name in names(y)) {
    if (name %in% names(x)) {
      # if both are null, want to avoid setting out$name <- NULL
      # because that will remove name from out
      if (is.null(out[[name]]) && is.null(y[[name]])) break
      out[[name]] <- y[[name]]
    }
  }

  out
}
