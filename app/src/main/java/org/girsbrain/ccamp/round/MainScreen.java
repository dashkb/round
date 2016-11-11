package org.girsbrain.ccamp.round;

import android.app.Activity;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;

import org.girsbrain.ccamp.round.Adapters.LazyListAdapter;
import org.girsbrain.ccamp.round.Data.Artist;
import org.girsbrain.ccamp.round.Data.ArtistDao;
import org.girsbrain.ccamp.round.Data.DaoSession;
import org.girsbrain.ccamp.round.Data.Genre;
import org.girsbrain.ccamp.round.Data.GenreDao;
import org.girsbrain.ccamp.round.Data.Track;
import org.girsbrain.ccamp.round.Data.TrackDao;
import org.greenrobot.greendao.query.LazyList;

import java.util.List;

public class MainScreen extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_screen);

        DaoSession daoSession = ((App) getApplication()).getDaoSession();
        TrackDao artistDao = daoSession.getTrackDao();

        final ListView mainList = (ListView) findViewById(R.id.mainList);
        final LazyList<Track> items = artistDao
                .queryBuilder()
                .orderAsc(TrackDao.Properties.Title)
                .listLazy();
        MainListAdapter adapter = new MainListAdapter(this, items);

        mainList.setAdapter(adapter);
        mainList.setFastScrollEnabled(true);

        ScrollerTask task = new ScrollerTask(new OnTickHandler() {
            @Override
            public void OnTick() {
                mainList.smoothScrollByOffset(items.size());
            }
        });
        task.execute();
    }

    public interface OnTickHandler {
        public void OnTick();
    }

    public class ScrollerTask extends AsyncTask<Void, Void, Void> {
        OnTickHandler handler;

        public ScrollerTask(OnTickHandler handler) {
            this.handler = handler;
        }

        @Override
        protected Void doInBackground(Void... voids) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
            }

            handler.OnTick();
            return null;
        }
    }

    public class MainListAdapter extends LazyListAdapter<Track> {
        public MainListAdapter(Context context, LazyList<Track> lazyList) {
            super(context, lazyList);
        }

        @Override
        public View newView(Context context, Track item, ViewGroup parent) {
            if (item == null) {
                return null;
            }

            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            return inflater.inflate(R.layout.main_list_row_item, parent, false);
        }

        @Override
        public void bindView(View view, Context context, Track item) {
            TextView txtName = (TextView) view.findViewById(R.id.textViewItem);
            txtName.setText(item.getTitle());
            txtName.setTag(item.getId());
        }
    }
}
