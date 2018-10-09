interface PackageJSON {
  name?: string
  version?: string
  description?: string
  author?: string
  license: string
  main: string

  prettier?: any
  standard?: any
  husky?: any
  ['lint-staged']?: any
  scripts: TypedObject<string>
  devDependencies?: TypedObject<string>
  dependencies?: TypedObject<string>
}

interface TypedObject<T = any> {
  [key: string]: T
}
