INSERT INTO users (username, email, password_digest)
VALUES

    ('partyzl', 'parth@parth.com', 'password'),
    ('cerise-at', 'cerise@cerise.come', 'password'),
    ('abi-mcp', 'abi@abi.com', 'password'),
    ('kenneth-cwy', 'ken@ken.com', 'password'),
    ('sallan464', 'simon@simon.com', 'password');

INSERT INTO habits (username, habit, selectedDays)
VALUES  

    ('cerise-at', 'running a 5k', '{6}'),
    ('cerise-at', 'going to the gym', '{2,4,6}'),
    ('sallan464', 'waking up at 5', '{1,2,3,4,5}');

INSERT INTO track (habitId, streak, date)
VALUES
    
    (1, 17, '01 Sep 2021'),
    (2, 12, '31 Aug 2021'),
    (3, 40, '01 Sep 2021');