test_that("merge lists", {
  old <- list(a = 1, b = 2, c = 3)

  # simple replacement
  new <- list(a = 2, b = 2, c = 3)
  expect_equal(merge_lists(old, new), new)

  # additional elements are ignored
  new <- list(a = 1, b = 2, c = 3, d = 4)
  expect_equal(merge_lists(old, new), old)

  # replace NULL
  old <- list(a = 1, b = NULL)
  new <- list(a = 1, b = 2)
  expect_equal(merge_lists(old, new), new)

  # NULL doesn't get dropped if element is NULL in both lists
  old <- list(a = 1, b = NULL)
  new <- list(a = 2, b = NULL)
  expect_equal(merge_lists(old, new), new)
})


test_that("make column definitions", {

  iris_expected <- list(
    list(
      accessorKey = "Sepal.Length"
    ),
    list(
      accessorKey = "Sepal.Width"
    ),
    list(
      accessorKey = "Petal.Length"
    ),
    list(
      accessorKey = "Petal.Width"
    ),
    list(
      accessorKey = "Species"
    )
  )

  expect_equal(make_column_defs(iris), iris_expected)

})


test_that("pagination", {

  # simple case
  paginatedData <- paginate(mtcars[1:20, ])
  expect_equal(max(paginatedData$pageIndex), 2)
  expect_equal(paginatedData$pageIndex, rep(c(1, 2), each = 10))

  # n rows not divisible by page size
  paginatedData <- paginate(mtcars)
  expect_equal(max(paginatedData$pageIndex), 4)
  page_col_expected <- c(
    rep(1:3, each = 10),
    rep(4, 2)
  )
  expect_equal(paginatedData$pageIndex, page_col_expected)

  # specified page size less than minimum (10)
  paginatedData <- paginate(mtcars, page_size = 5)
  expect_equal(max(paginatedData$pageIndex), 4)
  expect_equal(paginatedData$pageIndex, page_col_expected)

  # specified page size greater than maximum (25)
  paginatedData <- paginate(mtcars, page_size = 50)
  expect_equal(max(paginatedData$pageIndex), 2)
  page_col_expected <- c(
    rep(1, 25),
    rep(2, 7)
  )
  expect_equal(paginatedData$pageIndex, page_col_expected)

})


test_that("cursor", {

  # for first cursor, previous is NULL
  expect_equal(
    cursify(cursor = 1, page_size = 5, n_rows = 20),
    list(
      previousCursor = NULL,
      nextCursor = 2,
      rowIndices = 1:5
    )
  )

  expect_equal(
    cursify(cursor = 2, page_size = 5, n_rows = 20),
    list(
      previousCursor = 1,
      nextCursor = 3,
      rowIndices = 6:10
    )
  )

  # for last cursor, next is NULL
  expect_equal(
    cursify(cursor = 4, page_size = 5, n_rows = 20),
    list(
      previousCursor = 3,
      nextCursor = NULL,
      rowIndices = 16:20
    )
  )

})

