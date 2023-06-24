import csv

new_data = []

with open("./submissions.csv", "r") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if row["contest_id"] == "typical90":
            new_data.append(row.values())

with open("./typical90_submissions.csv", "w") as csvfile:
    writer = csv.writer(csvfile, delimiter=",", quotechar='|', quoting=csv.QUOTE_MINIMAL)
    writer.writerows(new_data)
