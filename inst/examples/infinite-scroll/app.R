library(shiny)
library(mesa)

ui <- function() {
  tagList(
    mesaOutput("tbl")
  )
}

server <- function(input, output, session) {

  mtcarsplus <- do.call("rbind", lapply(1:10, \(x) mtcars))

  output$tbl <- renderMesa({
    mesa(
      data = mtcarsplus,
      ssrOptions = list(useInfiniteScroll = TRUE)
    )
  })


}

shinyApp(ui, server)
