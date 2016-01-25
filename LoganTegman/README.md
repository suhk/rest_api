# Kittens Per Internetz API

### Kittens (`/api/kittens`)

Standard CRUD endpoint for kittens. Each kitten has a required property of `name` (`String`)
and a property `eats` (`String`) that defaults to `yogurt` and `creates` (`String`) that defaults to
`magic`.

### Internetz (`/api/internetz`)

Standard CRUD endpoint for internetz. Each internetz can have a `name` (`String`),
`location` (`[Number, Number]`), and `kittens` (`[ObjectId]`).

### Ratio (`/api/ratio`)

For when you need to know the ratio of kittens to internetz. Provides responses
in the form of `{ "KPIratio": 1.2 }`
