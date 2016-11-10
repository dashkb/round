package org.girsbrain.ccamp.round;

import android.app.Application;

import org.girsbrain.ccamp.round.Data.DaoMaster;
import org.girsbrain.ccamp.round.Data.DaoSession;
import org.greenrobot.greendao.database.Database;

public class App extends Application {
    private DaoSession daoSession;

    @Override
    public void onCreate() {
        super.onCreate();

        DaoMaster.DevOpenHelper helper = new DaoMaster.DevOpenHelper(this, "round-db");
        Database db = helper.getWritableDb();
        daoSession = new DaoMaster(db).newSession();
    }

    public DaoSession getDaoSession() {
        return daoSession;
    }
}