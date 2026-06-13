-- Run this query ONLY to add the address column to existing orders table!

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'address') THEN
    ALTER TABLE orders ADD COLUMN address TEXT;
    RAISE NOTICE 'Added address column to orders table';
  ELSE
    RAISE NOTICE 'Address column already exists!';
  END IF;
END $$;
