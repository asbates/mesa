ssrPaginationRenderHook <- function(session, id, props) {

  paginated_data <- paginate(props$data)
  url <- paste0(
    "http://",
    session$request$HTTP_HOST,
    "/session/",
    session$token,
    "/dataobj/",
    id
  )

  session$sendCustomMessage(
    "registerMesaData",
    list(
      id = id,
      url = url
    )
  )

  session$registerDataObj(
    name = id,
    data = paginated_data,
    filterFunc = function(data, req) {
      if (req$REQUEST_METHOD == "GET") {
        pageIndex <- as.numeric(shiny::parseQueryString(req$QUERY_STRING)$pageIndex)
        pageData <- data[data$pageIndex == pageIndex, ]
        pageData$pageIndex <- NULL

        shiny::httpResponse(
          status = 200L,
          content_type = "application/json",
          content = jsonlite::toJSON(pageData)
        )
      }
    }
  )

  props
}



ssrInfiniteScrollRenderHook <- function(session, id, props) {

  url <- paste0(
    "http://",
    session$request$HTTP_HOST,
    "/session/",
    session$token,
    "/dataobj/",
    id
  )

  session$sendCustomMessage(
    "registerMesaData",
    list(
      id = id,
      url = url
    )
  )

  session$registerDataObj(
    name = id,
    data = props$data,
    filterFunc = function(data, req) {
      if (req$REQUEST_METHOD == "GET") {
        cursor <- as.numeric(shiny::parseQueryString(req$QUERY_STRING)$cursor)
        n_rows <- nrow(data)

        cursor_info <- cursify(cursor = cursor, page_size = 25, n_rows = n_rows)
        pageData <- data[cursor_info$rowIndices, ]

        shiny::httpResponse(
          status = 200L,
          content_type = "application/json",
          content = jsonlite::toJSON(list(
            data = pageData,
            previousCursor = cursor_info$previousCursor,
            nextCursor = cursor_info$nextCursor
          ), auto_unbox = TRUE, null = "null")
        )
      }
    }
  )

  props
}

