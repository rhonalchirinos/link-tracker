## Description

This project is a URL shortening and tracking service built with NestJS. It allows users to create shortened links, track their usage, and manage link validity. The project uses MongoDB for data storage and Redis for caching.

## Postman collection

I invite you to use postman to perform tests

[postman](https://github.com/rhonalchirinos/link-tracker/blob/main/link_tracker.postman_collection.json)

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints

### Create a Link

```http
POST /l
```

**Request Body:**

```json
{
  "url": "https://example.com",
  "password": "optional-password",
  "validUntil": "2025-01-01T00:00:00Z"
}
```

**Response:**

```json
{
  "target": "https://example.com",
  "link": "http://localhost:3000/l/abc123",
  "valid": true
}
```

### Redirect to Original URL

```http
GET /l/:code
```

**Parameters:**

- `code`: The shortened link code.

**Query Parameters:**

- `password`: The password if the link is protected.

**Response:**

Redirects to the original URL.

### Get Link Statistics

```http
GET /l/:code/stats
```

**Parameters:**

- `code`: The shortened link code.

**Response:**

```json
{
  "stats": {
    "userAgent": [
      {
        "_id": "Mozilla/5.0",
        "count": 10
      }
    ],
    "total": 10
  },
  "items": [
    {
      "ip": "192.168.1.1",
      "userAgent": "Mozilla/5.0",
      "date": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### Invalidate a Link

```http
POST /l/:code/invalidate
```

**Parameters:**

- `code`: The shortened link code.

**Response:**

```json
{
  "message": "Link invalidated"
}
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Redis Documentation](https://redis.io/documentation)

## Support

For support, please contact [support@example.com](mailto:support@example.com).

## Stay in touch

- Author: Your Name
- Twitter: [@yourhandle](https://twitter.com/yourhandle)
- GitHub: [yourusername](https://github.com/yourusername)

## License

This project is licensed under the MIT License.
