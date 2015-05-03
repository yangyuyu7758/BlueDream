# coding: utf-8
import json
import csv
import sys
import codecs
import cStringIO
from optparse import OptionParser

# Meta
__version__ = '1.0.0'
__license__ = "GNU General Public License (GPL) Version 3"
__version_info__ = (1, 0, 0)
__author__ = 'yuqiaoling yangyuyu9898@163.com'


class UnicodeWriter:
    """
    A CSV writer which will write rows to CSV file "f",
    which is encoded in the given encoding.
    """

    def __init__(self, f, dialect=csv.excel, encoding="utf-8", **kwds):
        # Redirect output to a queue
        self.queue = cStringIO.StringIO()
        self.writer = csv.writer(self.queue, dialect=dialect, **kwds)
        self.stream = f
        self.encoder = codecs.getincrementalencoder(encoding)()

    def writerow(self, row):
        self.writer.writerow([s.encode("utf-8") for s in row])
        # Fetch UTF-8 output from the queue ...
        data = self.queue.getvalue()
        data = data.decode("utf-8")
        # ... and reencode it into the target encoding
        data = self.encoder.encode(data)
        # write to the target stream
        self.stream.write(data)
        # empty queue
        self.queue.truncate(0)

    def writerows(self, rows):
        for row in rows:
            self.writerow(row)

def writeCsvRow(csvfile,data,context,keySep):	
	for item in data:
		if not isinstance(data[item],dict):
			if context:
				csvfile.writerow([context+keySep+item,data[item]])
			elif data[item]:		
				csvfile.writerow([item,data[item]])
			else:
				csvfile.writerow([item,""])	
		else:	
			writeCsvRow(csvfile,data[item],item,keySep)

def main():
	usage = 'usage: %prog [options] ...'
	parser = OptionParser(usage=usage, version=__version__)
	parser.disable_interspersed_args()
	parser.add_option("-f", "--file", dest="jsonFile", default='translation.json', help="Location of the json file wait translate.", metavar="<file>")
	parser.add_option("-o", "--out", dest="csvFile", default='translation.csv', help="Location of the csv file.", metavar="<file>")
	parser.add_option("-k", "--key", dest="keySep", default="::", help=" The default key separator.(:: by default)", metavar="<keySep>")
    
    
	(options, args) = parser.parse_args()

	# Check to make sure we were passed at least one command line argument
	try:
		sys.argv[1]
	except:
		print "\nError:  At a minimum you must supply an input jsonfile (-f)."
        	parser.print_help()
        	sys.exit(2)

	jsonFile = options.jsonFile
	keySep = options.keySep
	csvFile = options.csvFile

	f = codecs.open(jsonFile,'r','utf-8')
	data = json.load(f)
	f.close()
	fieldnames = ("origin","translation")
	f = open(csvFile,'wb+')
	f.write(codecs.BOM_UTF8)  
	csvfile=UnicodeWriter(f)
	csvfile.writerow(fieldnames)
	writeCsvRow(csvfile,data,"",keySep)

if __name__ == "__main__":
	main()
else:
	# This will be executed if sshpt was imported as a module
	pass # Nothing yet




