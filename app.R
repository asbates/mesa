library(shiny)
devtools::load_all(".")


ui <- function() {
  tagList(
    mesaDependency(),
    mesaOutput("tbl"),
    tags$div(
      class = "test"
    )
  )
}

server <- function(input, output, session) {

  output$tbl <- renderMesa({
    mesa(
      columns = lapply(
        names(mtcars),
        \(name) {
          list(
            accessorKey = name
          )
        }
      ),
      data = mtcars,
      ssrOptions = list(useSSR = TRUE, usePagination = TRUE)
    )
  })


}

shinyApp(ui, server)
