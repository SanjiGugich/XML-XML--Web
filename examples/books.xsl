<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8"/>
  <xsl:template match="/">
    <html lang="ru"><head><meta charset="UTF-8"/><title>Каталог</title></head><body>
      <h1>Каталог книг</h1>
      <ul>
        <xsl:for-each select="catalog/book">
          <li><strong><xsl:value-of select="title"/></strong> — <xsl:value-of select="author"/></li>
        </xsl:for-each>
      </ul>
    </body></html>
  </xsl:template>
</xsl:stylesheet>
