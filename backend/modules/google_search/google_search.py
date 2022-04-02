from googlesearch import search


def google_search(query):
    result = search(term=query, num_results=5, advanced=True)

    return result
