interface PackageJSON {
  name: string
  version: string
  description: string
  author: string
  license: string
  main: string
  scripts: Record<string, string>
  devDependencies: Record<string, string>
  dependencies: Record<string, string>
}
