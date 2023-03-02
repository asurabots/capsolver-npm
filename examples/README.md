PM2 Benchmark
-

- **Perform tests for a website with multiple PM2 processes.**

1. Install pm2 globally:  `npm install -g pm2`.
2. Set [pm2 config file](https://github.com/0qwertyy/capsolver-npm/blob/master/examples/ecosystem.config.js) as your preference.
3. Navigate to `./node_modules/capsolver-npm/examples/pm2/`.
4. Control processes: `pm2 start ecosystem.config.js` & `pm2 delete all`.
5. Print logs for all process: `pm2 logs`.

- [screenshot](https://s3.gifyu.com/images/webstorm64_pvt9zUKloT.gif)

[*Building fast test-project with capsolver-npm](https://www.youtube.com/watch?v=s9OyE_pBPyE)