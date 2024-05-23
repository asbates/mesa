library(shiny)
devtools::load_all(".")


ui <- function() {
  tagList(
    mesaDependency(),
    mesaOutput("tbl")
  )
}

server <- function(input, output, session) {

  mtcarsplus <- do.call("rbind", lapply(1:10, \(x) mtcars))

  output$tbl <- renderMesa({
    mesa(
      columns = lapply(
        names(mtcarsplus),
        \(name) {
          list(
            accessorKey = name
          )
        }
      ),
      data = mtcarsplus,
      ssrOptions = list(useSSR = TRUE, usePagination = FALSE, useInfiniteScroll = TRUE)
    )
  })

  # output$tbl <- renderMesa({
  #   mesa(
  #     columns = lapply(
  #       names(mtcars),
  #       \(name) {
  #         list(
  #           accessorKey = name
  #         )
  #       }
  #     ),
  #     data = mtcars,
  #     ssrOptions = list(useSSR = TRUE, usePagination = TRUE)
  #   )
  # })


}

shinyApp(ui, server)
