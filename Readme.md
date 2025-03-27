# Approach

I took a typescript approach just to avoid further maintainence issues. I chose a Model-View-Whatever design pattern approach. Only because I was
thinking about CRUD in mind. If we wanted to add extra functionality we can add it to the service as needed i.e 0Auth2.0, rate limiters etc.
None the less we instantiate our server with our service and controllers assigning them to appropriate route handlers. That was the basic idea :)

# User Management API - Simple, Clean, Effective

Hey there! 👋 This project is a lightweight API designed for managing user data. We built this with simplicity and efficiency in mind.  If you're looking for a straightforward way to handle user creation, retrieval, updating, and deletion, you've come to the right place.

## What's Under the Hood?

This isn't just another API. We've put in the effort to make it:

*   **Easy to Use:**  The endpoints are intuitive, and the data structures are clear.  You won't need a Ph.D. to figure it out.
*   **Fast:**  We've optimized the code for speed.  No one likes waiting around, especially when working with data.
*   **Reliable:**  We've built in checks and balances to make sure your data is handled properly.  It's not going to suddenly disappear or turn into gibberish.
* **Age-conscious:** The api will filter users that are less than 21 years of age.
*   **Well-Organized:**  The code is neatly structured, making it easy to navigate and understand.

## Getting Started - Jump Right In!

Ready to take it for a spin? Here's what you'll need to do:

1.  **Clone the Repo:**

    ```bash
    git clone [repository-url]
    cd [project-directory]
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Fire Up the Server:**

    ```bash
    npm run start
    ```

    This will start the API on `http://localhost:3000`.

## Available Endpoints - What Can You Do?

Here's a quick rundown of the API's capabilities:

*   **`POST /users`:** Create a new user. Send `name`, `email` and `age` in the body.
    * *Example*:
    ```json
    {
        "name": "John Doe",
        "email": "john@doe.com",
        "age": 25
    }
    ```
*   **`GET /users`:** Retrieve all users that are above 21 years of age.
*   **`GET /users/:id`:**  Get a specific user by their ID.
*   **`PUT /users/:id`:** Update an existing user.
*   **`DELETE /users/:id`:** Remove a user from the system.

## Error Handling

We've put a lot of thought into how the API handles errors.  Here's the gist:

*   **Bad Requests (400):**  If you send bad data, you'll get a 400.  We'll tell you what you messed up.
*   **Not Found (404):**  If you ask for something that doesn't exist, you'll get a 404.
*   **Server Errors (500):**  If we mess something up on our end, you'll get a 500.

