## 结果

执行成功以后，数据库会有显示

```js
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| test               |
+--------------------+
2 rows in set (0.00 sec)

mysql> use test;
Database changed
mysql> show tables;
+----------------------+
| Tables_in_test       |
+----------------------+
| _mysql_session_store |
+----------------------+
1 row in set (0.00 sec)

mysql>
```

在浏览器的 `Cookies` 列表当中也会有 `SESSION_ID` 字段



## 需要注意的地方

首先需要确保数据库是开启状态，其次是 `store` 的配置正确（帐号，密码，当前使用的数据库）

```js
let store = new MysqlSession({
  user: 'root',
  password: '',
  database: 'test',
  host: '127.0.0.1',
})
```


> 不过一般还是 `redis` 使用较多，可见 [koa-redis](https://github.com/koajs/koa-redis)