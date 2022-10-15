### What is This?!

This is a Test Application for the CKA/Prometheus.

It is a straightforward NodeJS application that exposes metrics on the `/metrics` endpoint.

---

To run the NodeJS application:

* Install the dependencies
    ```shell
    npm install 
    ```
* Run the App
    ```shell
    node app/server.js
    ```

To build the project:

```shell
docker build -t repo-name/image-name:image-tag .
docker push repo-name/image-name:image-tag
```