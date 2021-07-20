# Duck Fed System

## Description
Research Duck Fed System using NextJS Framework

## Getting Started

### Dependencies

* material-ui
* nextjs
* mongoose

### Installing

1. Clone the repo
   ```sh
   git clone https://github.com/ratchadj/duck-fed.git
   ```
2. Rename `.env.local.example` to be `.env.local` and edit information in file
   ```JS
    MONGODB_URI=
    GOOGLE_MAP_KEY=
   ```
3. Start container
   ```sh
   cd duck-fed
   docker-compose up -d
   ```
4. Go to http://localhost:3000

### Executing program

* Development
```
for running: docker-compose up -d
for accress container: docker container exec -it duck-fed sh
```
* Build
```
docker-compose build
```
## Authors

Contributors names and contact info

[@ratchada-jududom](https://www.linkedin.com/in/ratchada-jududom/)

## Roadmap
- [x] Functional Requirement
- [ ] Caching REST API e.g. HTTP response headers (Cache-Control)
- [ ] End to End Testing
- [ ] Scalable web application 
- [ ] Security scan
- [ ] Deployment script

## Architectural design
NextJS - Builds on top of React. It's easy one to work with dynamic route, data fetching, layouts, image optimizing, SEO etc. [Learn more](https://nextjs.org/docs/basic-features/pages)

NextJS API - Our website is simple request server-side to retrieve data. NextJS help us to easy develope. Able to deploy as serverless functions with AWS easily. [Learn more](https://www.serverless.com/blog/serverless-nextjs)

Mongo DB - RDBMS is good one but difficulties to scalling with sharding. I think for saving a lot of research data. I think NOSQL is more suitable. That's why I use document stores - MongDB with flexible schemas. [Learn more](https://www.xplenty.com/blog/which-database/)

REST API - Eventhough REST API has a fixed data structures. It's not flexible like GraphQL. But our web application is less data structures. Lest API endpoint. I think REST API is Easy to understand and implement. [Learn more](https://www.sanity.io/guides/graphql-vs-rest-api-comparison)

## Version History

* 0.1
    * Initial Release
