
#URL Shortener


By Greg Perlman

##User Stories:

>  1.  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
>  2.  If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
>  3.  When I visit that shortened URL, it will redirect me to my original link.

## Example Use:

<code>https://murmuring-headland-57921.herokuapp.com/new/http://yahoo.com</code>

## Outputs:

<code>
  { "url": http://yahoo.com, "new": "12345678" }
</code>

## Now in your address bar:

<code>
  https://murmuring-headland-57921.herokuapp.com/12345678
</code>

Will redirect you to the external link you created.


###Live Site:

https://murmuring-headland-57921.herokuapp.com/
