# City Library website (Frontend)

## Architecture

The website is stored in a private S3 bucket and distributed by Cloudfront.

## CI/CD

Every push to the main branch is followed by a deployment to S3 and Cloudfront cache invalidation