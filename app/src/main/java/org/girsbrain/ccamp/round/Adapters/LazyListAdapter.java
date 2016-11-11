package org.girsbrain.ccamp.round.Adapters;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import org.girsbrain.ccamp.round.Data.HasId;
import org.greenrobot.greendao.query.LazyList;

public abstract class LazyListAdapter<T extends HasId<Long>> extends BaseAdapter {
    private LazyList<T> lazyList;
    private boolean dataValid;
    private Context context;

    public LazyListAdapter(Context context, LazyList<T> lazyList) {
        this.lazyList = lazyList;
        this.dataValid = lazyList != null;
        this.context = context;
    }

    public LazyList<T> getLazyList() {
        return lazyList;
    }

    @Override
    public int getCount() {
        if (dataValid && lazyList != null) {
            return lazyList.size();
        } else {
            return 0;
        }
    }

    @Override
    public T getItem(int position) {
        if (dataValid && lazyList != null) {
            return lazyList.get(position);
        } else {
            return null;
        }
    }

    @Override
    public long getItemId(int position) {
        if (dataValid && lazyList != null) {
            T item = lazyList.get(position);
            if (item != null) {
                return item.getId();
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    @Override
    public boolean hasStableIds() {
        return true;
    }

    public View getView(int position, View convertView, ViewGroup parent) {

        if (!dataValid) {
            throw new IllegalStateException("this should only be called when lazylist is populated");
        }

        T item = lazyList.get(position);
        if (item == null) {
            throw new IllegalStateException("Item at position " + position + " is null");
        }

        View v;
        if (convertView == null) {
            v = newView(context, item, parent);
        } else {
            v = convertView;
        }
        bindView(v, context, item);
        return v;
    }

    public abstract View newView(Context context, T item, ViewGroup parent);
    public abstract void bindView(View view, Context context, T item);
}
