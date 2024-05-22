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
