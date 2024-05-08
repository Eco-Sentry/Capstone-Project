from pyspark.sql import SparkSession
from pyspark.sql.functions import lit

# Initialize Spark Session
spark = SparkSession.builder \
    .appName("Update Cassandra") \
    .config("spark.cassandra.connection.host", "localhost") \
    .config("spark.cassandra.connection.port", "9042") \
    .config("spark.cassandra.auth.username", "ecoadmin") \
    .config("spark.cassandra.auth.password", "ecosentry") \
    .config("spark.cassandra.connection.localDataCenter", "datacenter1") \
    .getOrCreate()

# Load data from Cassandra
df = spark.read \
    .format("org.apache.spark.sql.cassandra") \
    .options(table="sensorreading", keyspace="ecosentry") \
    .load()

# Update the longitude
df = df.withColumn("longitude", lit(150.894943))

# Write back to Cassandra
df.write \
    .format("org.apache.spark.sql.cassandra") \
    .options(table="sensorreading", keyspace="ecosentry") \
    .mode("append") \
    .save()

# Stop Spark Session
spark.stop()
