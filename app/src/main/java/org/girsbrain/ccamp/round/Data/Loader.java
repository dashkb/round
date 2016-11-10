package org.girsbrain.ccamp.round.Data;

import android.database.Cursor;
import android.util.Log;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.greenrobot.greendao.database.Database;

import java.io.IOException;
import java.net.URL;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public final class Loader {
    private DaoSession daoSession;

    public Loader(DaoSession daoSession) {
        this.daoSession = daoSession;
    }

    public void Load() throws IOException {
        JsonFactory jf = new JsonFactory();
        ObjectMapper mp = new ObjectMapper();
        jf.setCodec(mp);

        JsonParser jp = jf.createParser(new URL("http://10.0.2.2:3000/data.json"));
        
        Parse(jp);
    }

    private void Parse(JsonParser jp) throws IOException {
        if (jp.nextToken() != JsonToken.START_OBJECT) {
            throw new IOException("Expected data to start with an object!");
        }

        while (jp.nextToken() != JsonToken.END_OBJECT) {
            String section = jp.getCurrentName();

            if (Objects.equals("Genres", section)) {
                ParseGenres(jp);
            }
        }

        jp.close();
    }

    private void ParseGenres(JsonParser jp) throws IOException {
        if (jp.nextToken() != JsonToken.START_ARRAY) {
            throw new IOException("Expected genre to be a list, got " + jp.getCurrentToken().asString() + "!");
        }

        GenreDao dao = daoSession.getGenreDao();

        while (jp.nextToken() != JsonToken.END_ARRAY) {
            JsonNode node = jp.readValueAsTree();
            Genre genre = new Genre();
            Set<Long> existing = getExistingKeys(GenreDao.TABLENAME);

            genre.setId(node.get("id").asLong());
            genre.setName(node.get("name").asText());

            if (existing.contains(genre.getId())) {
                Log.d("EXIST", genre.getName());
            } else {
                Log.d("LOAD", genre.getName());
                dao.insert(genre);
            }
        }
    }

    private Set<Long> getExistingKeys(String table) {
        Set<Long> idList = new HashSet<Long>();
        Database database = daoSession.getDatabase();
        Cursor cursor = database.rawQuery("SELECT _id FROM " + table, null);

        if (cursor.moveToFirst()) {
            do {
                idList.add(cursor.getLong(0));
            } while (cursor.moveToNext());
        }

        return idList;
    }
}
