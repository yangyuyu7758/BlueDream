# coding: utf-8
import json
import csv
import sys
import codecs
from optparse import OptionParser

# Meta
__version__ = '1.0.0'
__license__ = "GNU General Public License (GPL) Version 3"
__version_info__ = (1, 0, 0)
__author__ = 'yuqiaoling <yangyuyu9898@163.com>'

class UnicodeCsvReader:
    def __init__(self, f, encoding="utf-8", **kwargs):
        self.csv_reader = csv.reader(f, **kwargs)
        self.encoding = encoding

    def __iter__(self):
        return self

    def next(self):
        # read and split the csv row into fields
        row = self.csv_reader.next() 
        # now decode
        return [unicode(cell, self.encoding) for cell in row]

    @property
    def line_num(self):
        return self.csv_reader.line_num

class UnicodeDictReader(csv.DictReader):
    def __init__(self, f, encoding="utf-8", fieldnames=None, **kwds):
        csv.DictReader.__init__(self, f, fieldnames=fieldnames, **kwds)
        self.reader = UnicodeCsvReader(f, encoding=encoding, **kwds)
jsonDict = {}

def GetDicObj(key,value,keySep):
	nPos = key.find(keySep)
	if -1==nPos:
		return {key:value}
	else:
		newKey = key[0:nPos]
		subKey = key[nPos+len(keySep):]
		return {newKey:GetDicObj(subKey,value,keySep)}
				
def UpDataItem(primaryKey,value, keySep):
		nPos = primaryKey.find(keySep)
		if -1==nPos:
			jsonDict.update({primaryKey:value})
		else:
			newPrimaryKey = primaryKey[0:nPos]
			subKey = primaryKey[nPos+len(keySep):]
			itemData = jsonDict.get(newPrimaryKey,"error")
			if	itemData == "error":
				jsonDict.update({newPrimaryKey:GetDicObj(subKey,value,keySep)})
			else:
				itemData.update({subKey:value})	

def main(argv):
	usage = 'usage: %prog [options] ...'
	parser = OptionParser(usage=usage, version=__version__)
	parser.disable_interspersed_args()
	parser.add_option("-f", "--file", dest="csvFile", default='translation.csv', help="Location of the csv file translated.", metavar="<file>")
	parser.add_option("-o", "--out", dest="jsonFile", default='translated.json', help="Location of the json file translated.", metavar="<file>")
	parser.add_option("-k", "--key", dest="keySep", default="::", help=" The default key separator.(:: by default)", metavar="<keySep>")
    
    
	(options, args) = parser.parse_args()

	# Check to make sure we were passed at least one command line argument
	try:
		sys.argv[1]
	except:
		print "\nError:  At a minimum you must supply an input csvfile (-f)."
        	parser.print_help()
        	sys.exit(2)

	jsonFile = options.jsonFile
	keySep = options.keySep
	csvFile = options.csvFile

	jsonfile = codecs.open(jsonFile, 'wb','utf-8')
	fieldnames = ("origin","translation")
	#keySep = "::"
	with open(csvFile, 'rb') as csvfile:
		spamreader = UnicodeCsvReader(csvfile)
		spamreader.next();
		for row in spamreader:
			UpDataItem(row[0], row[1],keySep)
	   		
	json.dump(jsonDict,jsonfile, ensure_ascii=False,indent=0);
	#jsonfile.write(jsonStr)

if __name__ == "__main__":
    main(sys.argv[1:])