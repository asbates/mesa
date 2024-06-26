% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/options.R
\docType{data}
\name{mesaStyleOptions}
\alias{mesaStyleOptions}
\title{Default style options}
\format{
An object of class \code{list} of length 6.
}
\usage{
mesaStyleOptions
}
\description{
These are the default values used for the \code{styleOptions} argument of \link{mesa}.
This allows you to add \emph{additional} classes to a table. A \code{mesa} table comes
with the classes listed below. To add additional classes, provide a
character vector of length 1, wich each class separates by a space.
For example if you wanted to use Bootstrap 5 table styling, you could set
\code{tableClass = "table table-primary"}. In the output, the \verb{<table>} tag
would have the class \verb{mesa-table table table-primary.}
}
\details{
\itemize{
\item \verb{<table>}: \code{mesa-table}
\item \verb{<thead>}: \code{mesa-thead}
\item \verb{<tbody>}: \code{mesa-tbody}
\item \verb{<th>}: \code{mesa-th}
\item \verb{<tr>}: \code{mesa-tr}
\item \verb{<td>}: \code{mesa-td}
}
}
\keyword{datasets}
