CREATE TABLE submissions (
    id INTEGER PRIMARY KEY,
    epoch_second INTEGER,
    problem_id TEXT,
    contest_id TEXT,
    user_id TEXT,
    language TEXT,
    point INTEGER,
    length INTEGER,
    result TEXT,
    execution_time TEXT
);

CREATE INDEX submissions_epoch_second_index ON submissions(epoch_second);
CREATE INDEX user_id ON submissions(user_id);

.mode csv
.import ./typical90_submissions.csv submissions
